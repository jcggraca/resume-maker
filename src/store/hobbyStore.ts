import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface HobbyState {
  hobbies: string
  updateHobbies: (hobbies: string) => void
}

const useHobbyStore = create(
  persist<HobbyState>(
    set => ({
      hobbies: '',
      updateHobbies: (hobbies: string) => set(() => ({
        hobbies,
      })),
    }),
    {
      name: 'hobby-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const useHobbies = () => useHobbyStore(state => state.hobbies)

export const useHobbyActions = () => ({
  updateHobbies: useHobbyStore((state) => state.updateHobbies),
})
