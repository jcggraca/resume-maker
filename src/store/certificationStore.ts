import type { Certification } from '../utils/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface useCertificationState {
  certifications: Certification[]
  actions: {
    addCertification: () => void
    updateCertification: (data: Partial<Certification>) => void
    removeCertification: (id: string) => void
  }
}

const useCertificationStore = create(
  persist<useCertificationState>(
    set => ({
      certifications: [],
      actions: {
        addCertification: () => set(state => ({
          certifications: [
            ...state.certifications,
            {
              id: crypto.randomUUID(),
              name: '',
              description: '',
              date: '',
              order: state.certifications.length > 0
                ? Math.max(...state.certifications.map(p => p.order)) + 1
                : 0,
            },
          ],
        })),
        updateCertification: data => set(state => ({
          certifications: state.certifications.map((item) => {
            if (item.id === data?.id) {
              if (data.order !== undefined) {
                const itemWithSameOrder = state.certifications.find(p => p.order === data.order)
                if (itemWithSameOrder) {
                  itemWithSameOrder.order = item.order
                }
              }
              return { ...item, ...data }
            }
            return item
          }).sort((a, b) => a.order - b.order).map((item, index) => ({
            ...item,
            order: index,
          })),
        })),
        removeCertification: id =>
          set(state => ({
            certifications: state.certifications
              .filter(cert => cert.id !== id)
              .map((cert, index) => ({
                ...cert,
                order: index,
              })),
          })),
      },
    }),
    {
      name: 'certification-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const useCertifications = () => useCertificationStore(state => state.certifications)

export const useCertificationActions = () => useCertificationStore(state => state.actions)
