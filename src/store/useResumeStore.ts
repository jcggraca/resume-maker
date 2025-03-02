import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface PersonalInfo {
  name: string
  email: string
  linkedin: string
  phone: string
  github: string
  location: string
  website: string
  jobTitle: string
  summary: string
}

export interface WorkPoint {
  id: string
  order: number
  description: string
}

export interface Work {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string
  currentlyWorking: boolean
  location: string
  order: number
  points: WorkPoint[]
}

export interface Skill {
  id: string
  name: string
  description: string
  order: number
}

export interface Language {
  id: string
  name: string
  level: string
  order: number
}

export interface Education {
  id: string
  institution: string
  date: string
  degree: string
  order: number
}

export interface Certification {
  id: string
  name: string
  description: string
  date: string
  order: number
}

interface ResumeState {
  personalInfo: PersonalInfo
  skills: Skill[]
  languages: Language[]
  education: Education[]
  works: Work[]
  certifications: Certification[]
  setPersonalInfo: (data: Partial<PersonalInfo>) => void
  addSkill: () => void
  updateSkill: (data: Partial<Skill>) => void
  removeSkill: (id: string) => void
  addLanguage: () => void
  updateLanguage: (data: Partial<Language>) => void
  removeLanguage: (id: string) => void
  addEducation: () => void
  updateEducation: (data: Partial<Education>) => void
  removeEducation: (id: string) => void
  addWork: () => void
  updateWork: (data: Partial<Work>) => void
  removeWork: (id: string) => void
  addWorkPoint: (id: string) => void
  updateWorkPoint: (workID: string, pointID: string, order?: number, description?: string) => void
  removeWorkPoint: (workID: string, pointID: string) => void
  addCertifications: () => void
  updateCertifications: (data: Partial<Certification>) => void
  removeCertifications: (id: string) => void
}

export const useResumeStore = create(
  persist<ResumeState>(
    set => ({
      personalInfo: {
        name: '',
        email: '',
        linkedin: '',
        phone: '',
        github: '',
        location: '',
        website: '',
        jobTitle: '',
        summary: '',
      },
      skills: [],
      languages: [],
      education: [],
      works: [],
      certifications: [],
      setPersonalInfo: data => set(state => ({ personalInfo: { ...state.personalInfo, ...data } })),
      addSkill: () => set(state => ({
        skills: [
          ...state.skills,
          {
            id: crypto.randomUUID(),
            name: '',
            description: '',
            order: state.skills.length > 0
              ? Math.max(...state.skills.map(p => p.order)) + 1
              : 0,
          },
        ],
      })),
      updateSkill: data => set(state => ({
        skills: state.skills.map((item) => {
          if (item.id === data.id) {
            if (data.order !== undefined) {
              const itemWithSameOrder = state.skills.find(p => p.order === data.order)
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
      removeSkill: id => set(state => ({
        skills: state.skills
          .filter(skill => skill.id !== id)
          .map((skill, index) => ({
            ...skill,
            order: index,
          })),
      })),
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
      addEducation: () => set(state => ({
        education: [
          ...state.education,
          {
            id: crypto.randomUUID(),
            institution: '',
            date: '',
            degree: '',
            order: state.education.length > 0
              ? Math.max(...state.education.map(p => p.order)) + 1
              : 0,
          },
        ],
      })),
      updateEducation: data => set(state => ({
        education: state.education.map((item) => {
          if (item.id === data.id) {
            if (data.order !== undefined) {
              const itemWithSameOrder = state.education.find(p => p.order === data.order)
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
      removeEducation: id => set(state => ({
        education: state.education
          .filter(item => item.id !== id)
          .map((item, index) => ({
            ...item,
            order: index,
          })),
      })),
      addWork: () => set(state => ({
        works: [
          ...state.works,
          {
            id: crypto.randomUUID(),
            company: '',
            role: '',
            location: '',
            startDate: '',
            endDate: '',
            currentlyWorking: false,
            points: [
              {
                id: crypto.randomUUID(),
                order: 0,
                description: '',
              },
            ],
            order: state.works.length > 0
              ? Math.max(...state.works.map(p => p.order)) + 1
              : 0,
          },
        ],
      })),
      updateWork: data => set(state => ({
        works: state.works.map((item) => {
          if (item.id === data.id) {
            if (data.order !== undefined) {
              const itemWithSameOrder = state.works.find(p => p.order === data.order)
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
      removeWork: id => set(state => ({
        works: state.works
          .filter(item => item.id !== id)
          .map((item, index) => ({
            ...item,
            order: index,
          })),
      })),
      addWorkPoint: id => set(state => ({
        works: state.works.map(item => (item.id === id
          ? {
              ...item,
              points: [
                ...item.points,
                {
                  id: crypto.randomUUID(),
                  order: item.points.length > 0
                    ? Math.max(...item.points.map(p => p.order)) + 1
                    : 0,
                  description: '',
                },
              ],
            }
          : item)),
      })),
      updateWorkPoint: (workID, pointID, order, description) =>
        set(state => ({
          works: state.works.map((item) => {
            if (item.id === workID) {
              const points = [...item.points]
              const pointToUpdate = points.find(p => p.id === pointID)

              if (pointToUpdate && order !== undefined) {
                const pointWithSameOrder = points.find(p => p.order === order)

                if (pointWithSameOrder) {
                  pointWithSameOrder.order = pointToUpdate.order
                }

                pointToUpdate.order = order
                if (description !== undefined) {
                  pointToUpdate.description = description
                }

                return {
                  ...item,
                  points: points
                    .sort((a, b) => a.order - b.order)
                    .map((point, index) => ({
                      ...point,
                      order: index,
                    })),
                }
              }

              if (description !== undefined) {
                const updatedPoints = points.map(point =>
                  point.id === pointID
                    ? { ...point, description }
                    : point,
                )
                return { ...item, points: updatedPoints }
              }
            }
            return item
          }),
        })),
      removeWorkPoint: (workID, pointID) =>
        set(state => ({
          works: state.works.map(work =>
            work.id === workID
              ? {
                  ...work,
                  points: work.points
                    .filter(point => point.id !== pointID)
                    .map((point, index) => ({
                      ...point,
                      order: index,
                    })),
                }
              : work,
          ),
        })),
      addCertifications: () => set(state => ({
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
      updateCertifications: data => set(state => ({
        certifications: state.certifications.map((item) => {
          if (item.id === data?.id) {
            if (data.order !== undefined) {
              const itemWithSameOrder = state.certifications.find(p => p.order === data.order)
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
      removeCertifications: id =>
        set(state => ({
          certifications: state.certifications
            .filter(cert => cert.id !== id)
            .map((cert, index) => ({
              ...cert,
              order: index,
            })),
        })),
    }),
    {
      name: 'resume-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
