import { pdf, PDFViewer } from '@react-pdf/renderer'
import { useState } from 'react'
// import Minimal from '../Theme/Minimal/Minimal'
// import Luke from '../Theme/Luke/Luke'
import Standard from '../Theme/Standard/Standard'
import Button from '../ui/Button/Button'

export default function Preview() {
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
    <div id="preview">
      {displayResume
        ? (
            <div>
              <Button onClick={() => setDisplayResume(false)}>Hide Resume</Button>
              <Button variant="secondary" onClick={handleDownload}>Download as PDF</Button>

              <PDFViewer width="100%" height="1000px">
                <Standard />
              </PDFViewer>
            </div>
          )
        : <Button onClick={() => setDisplayResume(true)}>Preview Resume</Button>}
    </div>
  )
}
