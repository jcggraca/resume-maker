import Certifications from './components/Certifications/Certifications'
import Education from './components/Education/Education'
import Languages from './components/Languages/Languages'
import PersonalInfo from './components/PersonalInfo/PersonalInfo'
import Preview from './components/Preview/Preview'
import Skills from './components/Skills/Skills'
import WorkExperience from './components/WorkExperience/WorkExperience'

export default function App() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <main className="main">
        <h1>Resume Maker</h1>

        <p>
          A simple app that allows you to make your CV in minutes.
          We give some tips and recommendations without using any AI.
          We don't selling any of your data. Everything you type lives in your browser.
        </p>

        <Preview />

        <PersonalInfo />
        <WorkExperience />
        <Education />
        <Skills />
        <Languages />
        <Certifications />
      </main>

      <footer>
        @
        {currentYear}
        {' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://joaograca.dev"
        >
          João Graça
        </a>
      </footer>
    </>
  )
}
