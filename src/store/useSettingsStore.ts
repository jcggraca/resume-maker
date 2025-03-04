import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface SettingsStore {
  theme: string
  language: string
  template: string
  font: string
  setTheme: (theme: string) => void
  setLanguage: (language: string) => void
  setTemplate: (template: string) => void
  setFont: (font: string) => void
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    set => ({
      theme: 'light',
      language: 'en',
      template: 'Standard',
      font: 'Roboto',
      setTheme: theme => set({ theme }),
      setLanguage: language => set({ language }),
      setTemplate: template => set({ template }),
      setFont: font => set({ font }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
