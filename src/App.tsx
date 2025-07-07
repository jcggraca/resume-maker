import { FC, lazy, ReactNode, Suspense } from 'react'
import Customization from './components/Customization/Customization'
import Header from './components/Header/Header'
import Nav from './components/Nav/Nav'
import PersonalInfo from './components/PersonalInfo/PersonalInfo'
import BackToTop from './components/BackToTop/BackToTop'
import Footer from './components/Footer/Footer'

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
