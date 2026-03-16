import type { Project } from '../utils/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface useProjectState {
  projects: Project[]
  addProject: () => void
  updateProject: (data: Partial<Project>) => void
  removeProject: (id: string) => void
}

const useProjectStore = create(
  persist<useProjectState>(
    set => ({
      projects: [],
      addProject: () => set(state => ({
        projects: [
          ...state.projects,
          {
            id: crypto.randomUUID(),
            name: '',
            description: '',
            link: '',
            order: state.projects.length > 0
              ? Math.max(...state.projects.map(p => p.order)) + 1
              : 0,
          },
        ],
      })),
      updateProject: data => set(state => ({
        projects: state.projects.map((item) => {
          if (item.id === data?.id) {
            if (data.order !== undefined) {
              const itemWithSameOrder = state.projects.find(p => p.order === data.order)
              if (itemWithSameOrder) {
                itemWithSameOrder.order = item.order
              }
            }
            return { ...item, ...data }
          }
          return item
        }).sort((a, b) => a.order - b.order).map((item, index) => ({
          ...item,
          order: index,
        })),
      })),
      removeProject: id => set(state => ({
        projects: state.projects
          .filter(cert => cert.id !== id)
          .map((cert, index) => ({
            ...cert,
            order: index,
          })),
      })),
    }),
    {
      name: 'project-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const useProjects = () => useProjectStore(state => state.projects)

export const useProjectActions = () => ({
  addProject: useProjectStore((state) => state.addProject),
  updateProject: useProjectStore((state) => state.updateProject),
  removeProject: useProjectStore((state) => state.removeProject),
})
