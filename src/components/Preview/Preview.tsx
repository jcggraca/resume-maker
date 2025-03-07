import { pdf, PDFViewer } from '@react-pdf/renderer'
import { useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import ErrorBoundary from '../../ErrorBoundary'
import { useResumeStore } from '../../store/useResumeStore'
import { useSettingsStore } from '../../store/useSettingsStore'
import { registerFonts } from '../../utils/registerFonts'
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

  useEffect(() => {
    registerFonts()
  }, [])

  const handleDownload = async () => {
    const renderTemplate = () => {
      const props = { personalInfo, certifications, works, skills, languages, education }
      switch (template) {
        case 'Standard':
          return <Standard {...props} />
        case 'Minimal':
          return <Minimal {...props} />
        default:
          return <Standard {...props} />
      }
    }

    try {
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
    catch (error) {
      console.error('Error generating PDF:', error)
    }
  }

  const closePreviewModal = () => {
    setDisplayResume(false)
  }

  const memoizedTemplate = useMemo(() => {
    const props = { personalInfo, certifications, works, skills, languages, education }

    switch (template) {
      case 'Standard':
        return <Standard key={lastUpdated} {...props} />
      case 'Minimal':
        return <Minimal key={lastUpdated} {...props} />
      default:
        return <Standard key={lastUpdated} {...props} />
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayResume])

  return (
    <section id="preview" className={styles.root}>
      <Button onClick={() => setDisplayResume(true)}>
        {intl.formatMessage({ id: 'previewResume' })}
      </Button>

      <Modal
        isOpen={displayResume}
        onClose={closePreviewModal}
      >
        <div className={styles.group}>
          <Button onClick={closePreviewModal}>
            {intl.formatMessage({ id: 'hideResume' })}
          </Button>
          <Button variant="secondary" onClick={handleDownload}>
            {intl.formatMessage({ id: 'downloadPDF' })}
          </Button>
        </div>

        <ErrorBoundary>
          {displayResume && (
            <PDFViewer key={lastUpdated} width="100%" height="90%">
              {memoizedTemplate}
            </PDFViewer>
          )}
        </ErrorBoundary>
      </Modal>
    </section>
  )
}
