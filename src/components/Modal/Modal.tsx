import type { FC, ReactNode } from 'react'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import styles from './Modal.module.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRoot = document.getElementById('modal-root') as HTMLElement

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape')
        onClose()
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.body.style.overflow = 'auto'
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || !modalRoot)
    return null

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          <X />
        </button>
        {children}
      </div>
    </div>,
    modalRoot,
  )
}

export default Modal
