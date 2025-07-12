import type { PersonalInfo } from '../utils/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface usePersonalState extends PersonalInfo {
  actions: {
    setPersonalInfo: (data: Partial<PersonalInfo>) => void
  }
}

const usePersonalStore = create(
  persist<usePersonalState>(
    set => ({
      name: '',
      email: '',
      linkedin: '',
      phone: '',
      github: '',
      location: '',
      website: '',
      jobTitle: '',
      summary: '',
      actions: {
        setPersonalInfo: data => set(state => ({
          ...state,
          ...data,
        })),
      },
    }),
    {
      name: 'personal-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const usePersonalField = <K extends keyof PersonalInfo>(key: K) => usePersonalStore(state => state[key])
export const usePersonal = () => usePersonalStore(state => state)

export const usePersonalActions = () => usePersonalStore(state => state.actions)
