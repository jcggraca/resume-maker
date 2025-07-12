import type { Language } from '../utils/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface useLanguageState {
  languages: Language[]
  actions: {
    addLanguage: () => void
    updateLanguage: (data: Partial<Language>) => void
    removeLanguage: (id: string) => void
  }
}

const useLanguageStore = create(
  persist<useLanguageState>(
    set => ({
      languages: [],
      actions: {
        addLanguage: () => set(state => ({
          languages: [
            ...state.languages,
            {
              id: crypto.randomUUID(),
              name: '',
              level: '',
              order: state.languages.length > 0
                ? Math.max(...state.languages.map(p => p.order)) + 1
                : 0,
            },
          ],
        })),
        updateLanguage: data => set(state => ({
          languages: state.languages.map((item) => {
            if (item.id === data.id) {
              if (data.order !== undefined) {
                const itemWithSameOrder = state.languages.find(p => p.order === data.order)
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
        removeLanguage: id => set(state => ({
          languages: state.languages
            .filter(language => language.id !== id)
            .map((language, index) => ({
              ...language,
              order: index,
            })),
        })),
      },
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const useLanguages = () => useLanguageStore(state => state.languages)

export const useLanguageActions = () => useLanguageStore(state => state.actions)
