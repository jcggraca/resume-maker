import { pdf, PDFViewer } from '@react-pdf/renderer'
import { useCallback, useEffect, useMemo, useState } from 'react'
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

  const translations = useMemo(() => ({
    skills: intl.formatMessage({ id: 'skills' }),
    experience: intl.formatMessage({ id: 'workExperience' }),
    languages: intl.formatMessage({ id: 'languages' }),
    education: intl.formatMessage({ id: 'education' }),
    certifications: intl.formatMessage({ id: 'certifications' }),
    summary: intl.formatMessage({ id: 'summary' }),
    present: intl.formatMessage({ id: 'present' }),
  }), [intl])

  const memoizedTemplate = useMemo(() => {
    const props = { personalInfo, certifications, works, skills, languages, education }

    switch (template) {
      case 'Standard':
        return <Standard translations={translations} key={lastUpdated} {...props} />
      case 'Minimal':
        return <Minimal translations={translations} key={lastUpdated} {...props} />
      default:
        return <Standard translations={translations} key={lastUpdated} {...props} />
    }
  }, [
    template,
    translations,
    personalInfo,
    certifications,
    works,
    skills,
    languages,
    education,
    lastUpdated,
  ])

  const handleDownload = useCallback(async () => {
    try {
      const blob = await pdf(memoizedTemplate).toBlob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `resume-${personalInfo?.name}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
    catch (error) {
      console.error('Error generating PDF:', error)
    }
  }, [memoizedTemplate])

  const closePreviewModal = useCallback(() => {
    setDisplayResume(false)
  }, [])

  const openPreviewModal = useCallback(() => {
    setDisplayResume(true)
  }, [])

  return (
    <section id="preview" className={styles.root}>
      <Button onClick={openPreviewModal}>
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
