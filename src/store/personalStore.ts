import type { PersonalInfo } from '../utils/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface usePersonalState extends PersonalInfo {
  setPersonalInfo: (data: Partial<PersonalInfo>) => void
  resetInfo: () => void
}

const initialState: PersonalInfo = {
  name: '',
  email: '',
  linkedin: '',
  phone: '',
  github: '',
  location: '',
  website: '',
  jobTitle: '',
  summary: '',
}

export const usePersonalStore = create(
  persist<usePersonalState>(
    set => ({
      ...initialState,
      setPersonalInfo: data => set(state => ({
        ...state,
        ...data,
      })),
      resetInfo: () => set(initialState),
    }),
    {
      name: 'personal-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
