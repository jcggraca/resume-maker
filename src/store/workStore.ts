import type { Work } from '../utils/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface useWorkState {
  works: Work[]
  addWork: () => void
  updateWork: (data: Partial<Work>) => void
  removeWork: (id: string) => void
  addWorkPoint: (id: string) => void
  updateWorkPoint: (workID: string, pointID: string, order?: number, description?: string) => void
  removeWorkPoint: (workID: string, pointID: string) => void
}

const useWorkStore = create(
  persist<useWorkState>(
    set => ({
      works: [],
      addWork: () => set(state => ({
        works: [
          ...state.works,
          {
            id: crypto.randomUUID(),
            company: '',
            role: '',
            location: '',
            startDate: '',
            endDate: '',
            currentlyWorking: false,
            points: [
              {
                id: crypto.randomUUID(),
                order: 0,
                description: '',
              },
            ],
            order: state.works.length > 0
              ? Math.max(...state.works.map(p => p.order)) + 1
              : 0,
          },
        ],
      })),
      updateWork: data => set(state => ({
        works: state.works.map((item) => {
          if (item.id === data.id) {
            if (data.order !== undefined) {
              const itemWithSameOrder = state.works.find(p => p.order === data.order)
              if (itemWithSameOrder) {
                itemWithSameOrder.order = item.order
              }
              return { ...item, ...data }
            }
            return { ...item, ...data }
          }
          return item
        }).sort((a, b) => a.order - b.order).map((item, index) => ({
          ...item,
          order: index,
        })),
      })),
      removeWork: id => set(state => ({
        works: state.works
          .filter(item => item.id !== id)
          .map((item, index) => ({
            ...item,
            order: index,
          })),
      })),
      addWorkPoint: id => set(state => ({
        works: state.works.map(item => (item.id === id
          ? {
            ...item,
            points: [
              ...item.points,
              {
                id: crypto.randomUUID(),
                order: item.points.length > 0
                  ? Math.max(...item.points.map(p => p.order)) + 1
                  : 0,
                description: '',
              },
            ],
          }
          : item)),
      })),
      updateWorkPoint: (workID, pointID, order, description) =>
        set(state => ({
          works: state.works.map((item) => {
            if (item.id === workID) {
              const points = [...item.points]
              const pointToUpdate = points.find(p => p.id === pointID)

              if (pointToUpdate && order !== undefined) {
                const pointWithSameOrder = points.find(p => p.order === order)

                if (pointWithSameOrder) {
                  pointWithSameOrder.order = pointToUpdate.order
                }

                pointToUpdate.order = order
                if (description !== undefined) {
                  pointToUpdate.description = description
                }

                return {
                  ...item,
                  points: points
                    .sort((a, b) => a.order - b.order)
                    .map((point, index) => ({
                      ...point,
                      order: index,
                    })),
                }
              }

              if (description !== undefined) {
                const updatedPoints = points.map(point =>
                  point.id === pointID
                    ? { ...point, description }
                    : point,
                )
                return { ...item, points: updatedPoints }
              }
            }
            return item
          }),
        })),
      removeWorkPoint: (workID, pointID) =>
        set(state => ({
          works: state.works.map(work =>
            work.id === workID
              ? {
                ...work,
                points: work.points
                  .filter(point => point.id !== pointID)
                  .map((point, index) => ({
                    ...point,
                    order: index,
                  })),
              }
              : work,
          ),
        })),
    }),
    {
      name: 'work-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const useWorks = () => useWorkStore(state => state.works)

export const useWorkActions = () => ({
  addWork: useWorkStore((state) => state.addWork),
  updateWork: useWorkStore((state) => state.updateWork),
  removeWork: useWorkStore((state) => state.removeWork),
  addWorkPoint: useWorkStore((state) => state.addWorkPoint),
  updateWorkPoint: useWorkStore((state) => state.updateWorkPoint),
  removeWorkPoint: useWorkStore((state) => state.removeWorkPoint),
})
