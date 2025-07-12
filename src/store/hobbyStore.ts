import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface HobbyState {
  hobbies: string
  actions: {
    updateHobbies: (hobbies: string) => void
  }
}

const useHobbyStore = create(
  persist<HobbyState>(
    set => ({
      hobbies: '',
      actions: {
        updateHobbies: (hobbies: string) => set(() => ({
          hobbies,
        })),
      },
    }),
    {
      name: 'hobby-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const useHobbies = () => useHobbyStore(state => state.hobbies)

export const useHobbyActions = () => useHobbyStore(state => state.actions)
