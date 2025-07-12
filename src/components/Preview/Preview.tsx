import { pdf, PDFViewer } from '@react-pdf/renderer'
import { useCallback, useEffect, useMemo } from 'react'
import ErrorBoundary from '../../ErrorBoundary'
import messages from '../../i18n/messages'
import { useFormatMessage } from '../../i18n/useFormatMessage'
import { useCertifications } from '../../store/certificationStore'
import { useTemplate } from '../../store/customizationStore'
import { useEducation } from '../../store/educationStore'
import { useHobbies } from '../../store/hobbyStore'
import { useLanguages } from '../../store/languageStore'
import { usePersonal } from '../../store/personalStore'
import { useProjects } from '../../store/projectStore'
import { useSkills } from '../../store/skillStore'
import { useWorks } from '../../store/workStore'
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
  const t = useFormatMessage()
  const template = useTemplate()
  const personalInfo = usePersonal()
  const certifications = useCertifications()
  const works = useWorks()
  const skills = useSkills()
  const languages = useLanguages()
  const education = useEducation()
  const hobbies = useHobbies()
  const projects = useProjects()

  useEffect(() => {
    registerFonts()
  }, [])

  const translations = useMemo(() => ({
    skills: t(messages.skills),
    experience: t(messages.workExperience),
    languages: t(messages.languages),
    education: t(messages.education),
    certifications: t(messages.certifications),
    summary: t(messages.summary),
    present: t(messages.present),
    hobbies: t(messages.hobbies),
    projects: t(messages.projects),
  }), [t])

  const memoizedTemplate = useMemo(() => {
    const props = { personalInfo, certifications, works, skills, languages, education, hobbies, projects }

    switch (template) {
      case 'Standard':
        return <Standard translations={translations} {...props} />
      case 'Minimal':
        return <Minimal translations={translations} {...props} />
      default:
        return <Standard translations={translations} {...props} />
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
        <Button className={styles.closeButton} onClick={onClose}>
          {t(messages.hideResume)}
        </Button>
        <Button variant="secondary" onClick={handleDownload}>
          {t(messages.downloadPDF)}
        </Button>
      </div>

      <ErrorBoundary>
        <PDFViewer width="100%" height="90%">
          {memoizedTemplate}
        </PDFViewer>
      </ErrorBoundary>
    </Modal>
  )
}
