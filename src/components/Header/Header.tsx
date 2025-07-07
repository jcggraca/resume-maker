import { Moon, Sun, FileUser } from 'lucide-react'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useSettingsStore } from '../../store/useSettingsStore'
import PreviewButton from '../Preview/PreviewButton'
import styles from './Header.module.css'

export default function Header() {
  const intl = useIntl()
  const { theme, language, setTheme, setLanguage } = useSettingsStore()

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <header className={styles.root}>
      <h1 className={styles.desktopTitle}>Resume Maker</h1>
      <h1 className={styles.mobileTitle}><FileUser /></h1>

      <div className={styles.rightSide}>
        <PreviewButton />

        <div>
          <label className="sr-only" htmlFor="language-select">{intl.formatMessage({ id: 'selectLanguage' })}</label>
          <select id="language-select" onChange={e => setLanguage(e.target.value)} defaultValue={language}>
            <option value="en">{intl.formatMessage({ id: 'english' })}</option>
            <option value="pt">{intl.formatMessage({ id: 'portuguese' })}</option>
          </select>
        </div>

        <button
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`${styles.button} ${theme === 'dark' ? styles.dark : styles.light}`}
          aria-label={`
            ${intl.formatMessage({ id: 'switchTheme' })}
            ${' '}
            ${intl.formatMessage({ id: theme === 'dark' ? 'light' : 'dark' })}
            ${' '}
            ${intl.formatMessage({ id: 'mode' })}
          `}
        >
          {theme === 'dark' ? <Sun /> : <Moon />}
        </button>
      </div>
    </header>
  )
}
