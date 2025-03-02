import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface SettingsStore {
  theme: string
  language: string
  setTheme: (theme: string) => void
  setLanguage: (language: string) => void
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    set => ({
      theme: 'light',
      language: 'en',
      setTheme: theme => set({ theme }),
      setLanguage: language => set({ language }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
