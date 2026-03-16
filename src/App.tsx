import type { FC, ReactNode } from 'react'
import { lazy, Suspense } from 'react'
import BackToTop from './components/BackToTop/BackToTop'
import Customization from './components/Customization/Customization'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Nav from './components/Nav/Nav'
import PersonalInfo from './components/PersonalInfo/PersonalInfo'

const WorkExperience = lazy(async () => import('./components/WorkExperience/WorkExperience'))
const Education = lazy(async () => import('./components/Education/Education'))
const Skills = lazy(async () => import('./components/Skills/Skills'))
const Languages = lazy(async () => import('./components/Languages/Languages'))
const Certifications = lazy(async () => import('./components/Certifications/Certifications'))
const Projects = lazy(async () => import('./components/Projects/Projects'))
const Hobbies = lazy(async () => import('./components/Hobbies/Hobbies'))

const LazyWrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <Suspense fallback={<div>Loading...</div>}>
    {children}
  </Suspense>
)

export default function App() {
  return (
    <>
      <Header />
      <Nav />

      <main className="main">
        <Customization />
        <PersonalInfo />

        <LazyWrapper>
          <WorkExperience />
          <Education />
          <Skills />
          <Languages />
          <Certifications />
          <Projects />
          <Hobbies />
        </LazyWrapper>
      </main>

      <BackToTop />
      <Footer />
    </>
  )
}
