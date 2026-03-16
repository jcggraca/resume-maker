import { lazy, Suspense, useCallback, useState } from 'react'
import messages from '../../i18n/messages'
import { useFormatMessage } from '../../i18n/useFormatMessage'
import Button from '../ui/Button/Button'

const loadPreview = () => import('./Preview');
const LazyPreview = lazy(loadPreview);

export default function PreviewButton() {
  const t = useFormatMessage()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = useCallback((state: boolean) => () => {
    setIsModalOpen(state);
  }, [])

  const handleMouseEnter = () => {
    loadPreview()
  }

  return (
    <section id="preview">
      <Button variant="secondary" onClick={toggleModal(true)}
        onMouseEnter={handleMouseEnter}>
        {t(messages.previewResume)}
      </Button>

      {isModalOpen && (
        <Suspense fallback={<div className="loader">Loading...</div>}>
          <LazyPreview 
            isOpen={isModalOpen} 
            onClose={toggleModal(false)} 
          />
        </Suspense>
      )}
    </section>
  )
}
