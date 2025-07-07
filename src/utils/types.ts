import type { Certification, Education, Language, PersonalInfo, Project, Skill, Work } from '../store/useResumeStore'

export interface Translations {
  skills: string
  experience: string
  languages: string
  education: string
  certifications: string
  summary: string
  present: string
  hobbies: string
  projects: string
}

export interface TemplatesProps {
  personalInfo: PersonalInfo
  certifications: Certification[]
  works: Work[]
  skills: Skill[]
  languages: Language[]
  education: Education[]
  translations: Translations
  projects: Project[]
  hobbies: string
}
