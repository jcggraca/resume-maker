import type { Locale } from '../../utils/types'
import { FileUser, Moon, Sun } from 'lucide-react'
import { useEffect } from 'react'
import messages from '../../i18n/messages'
import { useFormatMessage } from '../../i18n/useFormatMessage'
import { useLocale, useSettingActions, useTheme } from '../../store/settingStore'
import PreviewButton from '../Preview/PreviewButton'
import styles from './Header.module.css'

export default function Header() {
  const t = useFormatMessage()

  const theme = useTheme()
  const locale = useLocale()

  const { setLocale, setTheme } = useSettingActions()

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
          <label className="sr-only" htmlFor="language-select">{t(messages.selectLanguage)}</label>
          <select id="language-select" onChange={e => setLocale(e.target.value as Locale)} defaultValue={locale}>
            <option value="en">{t(messages.english)}</option>
            <option value="pt">{t(messages.portuguese)}</option>
          </select>
        </div>

        <button
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`${styles.button} ${theme === 'dark' ? styles.dark : styles.light}`}
          aria-label={`
            ${t(messages.switchTheme)}
            ${' '}
            ${theme === 'dark' ? t(messages.light) : t(messages.dark)}
            ${' '}
            ${t(messages.mode)}
          `}
        >
          {theme === 'dark' ? <Sun /> : <Moon />}
        </button>
      </div>
    </header>
  )
}
