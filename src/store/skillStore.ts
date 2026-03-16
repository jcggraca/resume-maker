import type { Skill } from '../utils/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface useSkillState {
  skills: Skill[]
    addSkill: () => void
    updateSkill: (data: Partial<Skill> & { id: string }) => void
    removeSkill: (id: string) => void
}

const useSkillStore = create(
  persist<useSkillState>(
    set => ({
      skills: [],
        addSkill: () => set(state => ({
          skills: [
            ...state.skills,
            {
              id: crypto.randomUUID(),
              name: '',
              description: '',
              order: state.skills.length > 0
                ? Math.max(...state.skills.map(p => p.order)) + 1
                : 0,
            },
          ],
        })),
        updateSkill: data => set(state => ({
          skills: state.skills.map((item) => {
            if (item.id === data.id) {
              if (data.order !== undefined) {
                const itemWithSameOrder = state.skills.find(p => p.order === data.order)
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
        removeSkill: id => set(state => ({
          skills: state.skills
            .filter(skill => skill.id !== id)
            .map((skill, index) => ({
              ...skill,
              order: index,
            })),
        })),
    }),
    {
      name: 'skill-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const useSkills = () => useSkillStore(state => state.skills)

export const useSkillActions = () => ({
  addSkill: useSkillStore((state) => state.addSkill),
  updateSkill: useSkillStore((state) => state.updateSkill),
  removeSkill: useSkillStore((state) => state.removeSkill),
})

