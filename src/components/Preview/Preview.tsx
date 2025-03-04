import { Font, pdf, PDFViewer } from '@react-pdf/renderer'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useSettingsStore } from '../../store/useSettingsStore'
import Modal from '../Modal/Modal'
import Minimal from '../Theme/Minimal/Minimal'
import Standard from '../Theme/Standard/Standard'
import Button from '../ui/Button/Button'
import styles from './Preview.module.css'

export default function Preview() {
  const intl = useIntl()
  const { template } = useSettingsStore()
  const [displayResume, setDisplayResume] = useState(false)
  const [key, setKey] = useState(0)

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

  const handleDownload = async () => {
    const blob = await pdf(<Standard />).toBlob()
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'resume.pdf'
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const renderTemplate = () => {
    switch (template) {
      case 'Standard':
        return <Standard />
      case 'Minimal':
        return <Minimal />
      default:
        return <Standard />
    }
  }

  const openPreview = () => {
    setDisplayResume(true)
    setKey(prevKey => prevKey + 1)
  }

  return (
    <section id="preview" className={styles.root}>
      <Button onClick={openPreview}>
        {intl.formatMessage({ id: 'previewResume' })}
      </Button>

      <Modal
        key={key}
        isOpen={displayResume}
        onClose={() => setDisplayResume(false)}
      >
        <div className={styles.group}>
          <Button onClick={() => setDisplayResume(false)}>
            {intl.formatMessage({ id: 'hideResume' })}
          </Button>
          <Button variant="secondary" onClick={handleDownload}>
            {intl.formatMessage({ id: 'downloadPDF' })}
          </Button>
        </div>

        <PDFViewer key={key} width="100%" height="90%">
          {renderTemplate()}
        </PDFViewer>
      </Modal>
    </section>
  )
}
