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

export interface Project {
  id: string
  name: string
  description: string
  link: string
  order: number
}

export type Locale = 'en' | 'pt'

export type Theme = 'light' | 'dark'
