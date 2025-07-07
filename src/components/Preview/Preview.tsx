import { pdf, PDFViewer } from '@react-pdf/renderer'
import { useCallback, useEffect, useMemo } from 'react'
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

interface PreviewProps {
  isOpen: boolean
  onClose: () => void
};

export default function Preview({ isOpen, onClose }: PreviewProps) {
  const intl = useIntl()
  const { template } = useSettingsStore()
  const { personalInfo, certifications, works, skills, languages, education, hobbies, projects, lastUpdated } = useResumeStore()

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
    hobbies: intl.formatMessage({ id: 'hobbies' }),
    projects: intl.formatMessage({ id: 'projects' }),
  }), [intl])

  const memoizedTemplate = useMemo(() => {
    const props = { personalInfo, certifications, works, skills, languages, education, hobbies, projects }

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
    projects,
    hobbies,
    lastUpdated,
  ])

  const handleDownload = useCallback(async () => {
    try {
      const blob = await pdf(memoizedTemplate).toBlob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `resume-${personalInfo?.name ?? 'user'}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
    catch (error) {
      console.error('Error generating PDF:', error)
    }
  }, [memoizedTemplate, personalInfo?.name])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={styles.group}>
        <Button onClick={onClose}>
          {intl.formatMessage({ id: 'hideResume' })}
        </Button>
        <Button variant="secondary" onClick={handleDownload}>
          {intl.formatMessage({ id: 'downloadPDF' })}
        </Button>
      </div>

      <ErrorBoundary>
        <PDFViewer key={lastUpdated} width="100%" height="90%">
          {memoizedTemplate}
        </PDFViewer>
      </ErrorBoundary>
    </Modal>
  )
}
