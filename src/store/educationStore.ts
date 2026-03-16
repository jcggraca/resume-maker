import type { Education } from '../utils/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface useEducationState {
  education: Education[]
  addEducation: () => void
  updateEducation: (data: Partial<Education>) => void
  removeEducation: (id: string) => void
}

const useEducationStore = create(
  persist<useEducationState>(
    set => ({
      education: [],
      addEducation: () => set(state => ({
        education: [
          ...state.education,
          {
            id: crypto.randomUUID(),
            institution: '',
            date: '',
            degree: '',
            order: state.education.length > 0
              ? Math.max(...state.education.map(p => p.order)) + 1
              : 0,
          },
        ],
      })),
      updateEducation: data => set(state => ({
        education: state.education.map((item) => {
          if (item.id === data.id) {
            if (data.order !== undefined) {
              const itemWithSameOrder = state.education.find(p => p.order === data.order)
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
      removeEducation: id => set(state => ({
        education: state.education
          .filter(item => item.id !== id)
          .map((item, index) => ({
            ...item,
            order: index,
          })),
      })),
    }),
    {
      name: 'education-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const useEducation = () => useEducationStore(state => state.education)
export const useEducationItemById = (id: string) => useEducationStore(state => state.education.find(item => item.id === id))

export const useEducationActions = () => ({
  addEducation: useEducationStore((state) => state.addEducation),
  updateEducation: useEducationStore((state) => state.updateEducation),
  removeEducation: useEducationStore((state) => state.removeEducation),
})
