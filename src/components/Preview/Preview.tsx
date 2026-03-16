import { lazy, Suspense, useCallback, useEffect, useMemo, type JSX } from 'react'
import styles from './Preview.module.css'
import Modal from '../Modal/Modal'
import Button from '../ui/Button/Button'
import { useFormatMessage } from '../../i18n/useFormatMessage'
import { useTemplate } from '../../store/customizationStore'
import { useCertifications } from '../../store/certificationStore'
import { useWorks } from '../../store/workStore'
import { useSkills } from '../../store/skillStore'
import { useLanguages } from '../../store/languageStore'
import { useEducation } from '../../store/educationStore'
import { useHobbies } from '../../store/hobbyStore'
import { useProjects } from '../../store/projectStore'
import { registerFonts } from '../../utils/registerFonts'
import messages from '../../i18n/messages'
import { usePersonalStore } from '../../store/personalStore'
import ErrorBoundary from '../../ErrorBoundary'

const PDFViewer = lazy(() => import('@react-pdf/renderer').then(mod => ({ default: mod.PDFViewer })))
const Standard = lazy(() => import('../Theme/Standard/Standard'))
const Minimal = lazy(() => import('../Theme/Minimal/Minimal'))

interface PreviewProps {
  isOpen: boolean
  onClose: () => void
};

const downloadPdfBlob = async (template: JSX.Element, fileName: string) => {
  const { pdf } = await import('@react-pdf/renderer');

  const blob = await pdf(template).toBlob();

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default function Preview({ isOpen, onClose }: PreviewProps) {
  const t = useFormatMessage()
  const template = useTemplate()
  const personalInfo = usePersonalStore()
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
    const name = personalInfo?.name ?? '';
    const fileName = name
      ? `resume-${name.replace(/\s+/g, '-').toLowerCase()}.pdf`
      : 'resume.pdf';

    try {
      await downloadPdfBlob(memoizedTemplate, fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }, [memoizedTemplate, personalInfo?.name]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={styles.group}>
        <Button onClick={onClose}>
          {t(messages.hideResume)}
        </Button>
        <Button variant="secondary" onClick={handleDownload}>
          {t(messages.downloadPDF)}
        </Button>
      </div>

      <ErrorBoundary>
        <Suspense fallback={<div>Loading PDF...</div>}>
          <PDFViewer width="100%" height="90%">
            {memoizedTemplate}
          </PDFViewer>
        </Suspense>
      </ErrorBoundary>
    </Modal>
  )
}
