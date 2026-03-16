import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface useCustomizationState {
  template: string
  font: string
  setTemplate: (template: string) => void
  setFont: (font: string) => void
}

export const useCustomizationStore = create<useCustomizationState>()(
  persist(
    set => ({
      template: 'Standard',
      font: 'Roboto',
      setTemplate: (template) => set({ template }),
      setFont: (font) => set({ font }),
    }),
    {
      name: 'customization-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const useTemplate = () => useCustomizationStore((state) => state.template)
export const useFont = () => useCustomizationStore((state) => state.font)

export const useCustomizationActions = () => ({
  setFont: useCustomizationStore((state) => state.setFont),
  setTemplate: useCustomizationStore((state) => state.setTemplate),
})
