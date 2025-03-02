import BackToTop from './components/BackToTop/BackToTop'
import Certifications from './components/Certifications/Certifications'
import Education from './components/Education/Education'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Languages from './components/Languages/Languages'
import Nav from './components/Nav/Nav'
import PersonalInfo from './components/PersonalInfo/PersonalInfo'
import Preview from './components/Preview/Preview'
import Skills from './components/Skills/Skills'
import Tips from './components/Tips/Tips'
import WorkExperience from './components/WorkExperience/WorkExperience'

export default function App() {
  return (
    <>
      <Header />
      <Nav />

      <main className="main">
        <Tips />
        <Preview />
        <PersonalInfo />
        <WorkExperience />
        <Education />
        <Skills />
        <Languages />
        <Certifications />
      </main>

      <BackToTop />
      <Footer />
    </>
  )
}
