import { Font, pdf, PDFViewer } from '@react-pdf/renderer'
import { useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import ErrorBoundary from '../../ErrorBoundary'
import { useResumeStore } from '../../store/useResumeStore'
import { useSettingsStore } from '../../store/useSettingsStore'
import Modal from '../Modal/Modal'
import Minimal from '../Theme/Minimal/Minimal'
import Standard from '../Theme/Standard/Standard'
import Button from '../ui/Button/Button'
import styles from './Preview.module.css'

export default function Preview() {
  const intl = useIntl()
  const { template } = useSettingsStore()
  const { personalInfo, certifications, works, skills, languages, education, lastUpdated } = useResumeStore()
  const [displayResume, setDisplayResume] = useState(false)

  const memoizedTemplate = useMemo(() => {
    switch (template) {
      case 'Standard':
        return (
          <Standard
            personalInfo={personalInfo}
            certifications={certifications}
            works={works}
            skills={skills}
            languages={languages}
            education={education}
          />
        )
      case 'Minimal':
        return (
          <Minimal
            personalInfo={personalInfo}
            certifications={certifications}
            works={works}
            skills={skills}
            languages={languages}
            education={education}
          />
        )
      default:
        return (
          <Standard
            personalInfo={personalInfo}
            certifications={certifications}
            works={works}
            skills={skills}
            languages={languages}
            education={education}
          />
        )
    }
  }, [displayResume])

  useEffect(() => {
    Font.register({
      family: 'Roboto',
      fonts: [
        { src: '/fonts/Roboto-Regular.ttf' },
        { src: '/fonts/Roboto-Bold.ttf', fontWeight: 'bold' },
        { src: '/fonts/Roboto-Italic.ttf', fontStyle: 'italic' },
      ],
    })
  }, [])

  useEffect(() => {
    // !Fix update PDF after when the user remove a array item
    if (!displayResume)
      window.location.reload()
  }, [displayResume])

  const handleDownload = async () => {
    const renderTemplate = () => {
      switch (template) {
        case 'Standard':
          return (
            <Standard
              personalInfo={personalInfo}
              certifications={certifications}
              works={works}
              skills={skills}
              languages={languages}
              education={education}
            />
          )
        case 'Minimal':
          return (
            <Minimal
              personalInfo={personalInfo}
              certifications={certifications}
              works={works}
              skills={skills}
              languages={languages}
              education={education}
            />
          )
        default:
          return (
            <Standard
              personalInfo={personalInfo}
              certifications={certifications}
              works={works}
              skills={skills}
              languages={languages}
              education={education}
            />
          )
      }
    }

    const blob = await pdf(renderTemplate()).toBlob()
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'resume.pdf'
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <ErrorBoundary>
      <section id="preview" className={styles.root}>
        <Button onClick={() => setDisplayResume(true)}>
          {intl.formatMessage({ id: 'previewResume' })}
        </Button>

        <Modal
          isOpen={displayResume}
          onClose={() => setDisplayResume(false)}
          key={lastUpdated}
        >
          <div className={styles.group}>
            <Button onClick={() => setDisplayResume(false)}>
              {intl.formatMessage({ id: 'hideResume' })}
            </Button>
            <Button variant="secondary" onClick={handleDownload}>
              {intl.formatMessage({ id: 'downloadPDF' })}
            </Button>
          </div>

          <PDFViewer width="100%" height="90%">
            {memoizedTemplate}
          </PDFViewer>
        </Modal>
      </section>
    </ErrorBoundary>
  )
}
