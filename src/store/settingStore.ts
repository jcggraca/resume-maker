import type { Locale, Theme } from '../utils/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface useSettingState {
  theme: Theme
  locale: Locale
  actions: {
    setTheme: (theme: Theme) => void
    setLocale: (locale: Locale) => void
  }
}

const useSettingStore = create<useSettingState>()(
  persist(
    set => ({
      theme: 'light',
      locale: 'en',
      actions: {
        setTheme: theme => set({ theme }),
        setLocale: locale => set({ locale }),
      },
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const useTheme = () => useSettingStore(state => state.theme)
export const useLocale = () => useSettingStore(state => state.locale)

export const useSettingActions = () => useSettingStore(state => state.actions)
