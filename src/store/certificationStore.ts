import type { Certification } from '../utils/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface useCertificationState {
  certifications: Certification[]
  addCertification: () => void
  updateCertification: (data: Partial<Certification>) => void
  removeCertification: (id: string) => void
}

const useCertificationStore = create<useCertificationState>()(
  persist(
    (set) => ({
      certifications: [],

      addCertification: () => set((state) => ({
        certifications: [
          ...state.certifications,
          {
            id: crypto.randomUUID(),
            name: '',
            description: '',
            date: '',
            order: state.certifications.length,
          },
        ],
      })),

      updateCertification: (data) => set((state) => {
        const newItems = state.certifications.map((item) => {
          if (item.id === data.id) {
            return { ...item, ...data };
          }
          if (data.order !== undefined && item.order === data.order) {
            const originalItem = state.certifications.find(p => p.id === data.id);
            return { ...item, order: originalItem?.order ?? item.order };
          }
          return item;
        });

        return {
          certifications: newItems
            .sort((a, b) => a.order - b.order)
            .map((item, index) => ({ ...item, order: index })),
        };
      }),

      removeCertification: (id) => set((state) => ({
        certifications: state.certifications
          .filter((cert) => cert.id !== id)
          .map((cert, index) => ({ ...cert, order: index })),
      })),
    }),
    {
      name: 'certification-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export const useCertifications = () => useCertificationStore(state => state.certifications)

export const useCertificationActions = () => {
  const addCertification = useCertificationStore(state => state.addCertification)
  const updateCertification = useCertificationStore(state => state.updateCertification)
  const removeCertification = useCertificationStore(state => state.removeCertification)
  
  return { addCertification, updateCertification, removeCertification }
}
