import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import messages from '../../i18n/messages'
import { useFormatMessage } from '../../i18n/useFormatMessage'
import Button from '../ui/Button/Button'
import styles from './BackToTop.module.css'

function BackToTop() {
  const t = useFormatMessage()

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={styles.root}>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className={styles.button}
          variant="borderless"
          aria-label={t(messages.backToTop)}
        >
          <ArrowUp className={styles.icon} />
        </Button>
      )}
    </div>
  )
}

export default BackToTop
