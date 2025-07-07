import type { FC, ReactNode } from 'react'
import { lazy, Suspense } from 'react'
import BackToTop from './components/BackToTop/BackToTop'
import Customization from './components/Customization/Customization'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Nav from './components/Nav/Nav'
import PersonalInfo from './components/PersonalInfo/PersonalInfo'

const WorkExperience = lazy(() => import('./components/WorkExperience/WorkExperience'))
const Education = lazy(() => import('./components/Education/Education'))
const Skills = lazy(() => import('./components/Skills/Skills'))
const Languages = lazy(() => import('./components/Languages/Languages'))
const Certifications = lazy(() => import('./components/Certifications/Certifications'))
const Projects = lazy(() => import('./components/Projects/Projects'))
const Hobbies = lazy(() => import('./components/Hobbies/Hobbies'))

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
