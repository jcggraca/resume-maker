import { lazy, Suspense, useCallback, useState } from 'react'
import { useIntl } from 'react-intl'
import Button from '../ui/Button/Button'

interface LazyComponentProps {
  isOpen: boolean
  onClose: () => void
};

const LazyComponent = lazy(() => import('./Preview')) as React.LazyExoticComponent<
  React.ComponentType<LazyComponentProps>
>

export default function PreviewButton() {
  const intl = useIntl()
  const [displayResume, setDisplayResume] = useState(false)

  const closePreviewModal = useCallback(() => {
    setDisplayResume(false)
  }, [])

  const openPreviewModal = useCallback(() => {
    setDisplayResume(true)
  }, [])

  return (
    <section id="preview">
      <Button variant="secondary" onClick={openPreviewModal}>
        {intl.formatMessage({ id: 'previewResume' })}
      </Button>

      {displayResume && (
        <Suspense fallback={<div>Loading...</div>}>
          <LazyComponent isOpen={displayResume} onClose={closePreviewModal} />
        </Suspense>
      )}
    </section>
  )
}
