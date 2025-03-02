import { pdf, PDFViewer } from '@react-pdf/renderer'
import { useState } from 'react'
import { useIntl } from 'react-intl'
// import Minimal from '../Theme/Minimal/Minimal'
// import Luke from '../Theme/Luke/Luke'
import Standard from '../Theme/Standard/Standard'
import Button from '../ui/Button/Button'
import styles from './Preview.module.css'

export default function Preview() {
  const intl = useIntl()
  const [displayResume, setDisplayResume] = useState(false)

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

  return (
    <section id="preview" className={styles.root}>
      {displayResume
        ? (
            <div>
              <div className={styles.group}>
                <Button onClick={() => setDisplayResume(false)}>
                  {intl.formatMessage({ id: 'hideResume' })}
                </Button>
                <Button variant="secondary" onClick={handleDownload}>
                  {intl.formatMessage({ id: 'downloadPDF' })}
                </Button>
              </div>

              <PDFViewer width="100%" height="1000px">
                <Standard />
              </PDFViewer>
            </div>
          )
        : (
            <Button onClick={() => setDisplayResume(true)}>
              {intl.formatMessage({ id: 'previewResume' })}
            </Button>
          )}
    </section>
  )
}
