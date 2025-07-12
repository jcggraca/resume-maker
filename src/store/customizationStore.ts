import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface useCustomizationState {
  template: string
  font: string
  actions: {
    setTemplate: (template: string) => void
    setFont: (font: string) => void
  }
}

export const useCustomizationStore = create<useCustomizationState>()(
  persist(
    set => ({
      template: 'Standard',
      font: 'Roboto',
      actions: {
        setTemplate: template => set({ template }),
        setFont: font => set({ font }),
      },
    }),
    {
      name: 'customization-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const useTemplate = () => useCustomizationStore(state => state.template)
export const useFont = () => useCustomizationStore(state => state.font)

export const useCustomizationActions = () => useCustomizationStore(state => state.actions)
