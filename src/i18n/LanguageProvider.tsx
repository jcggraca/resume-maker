import type { FC } from 'react'
import type { Locale } from '../utils/types'
import { useMemo } from 'react'
import { IntlProvider } from 'react-intl'
import { useLocale } from '../store/settingStore'
import en from './en.json'
import pt from './pt.json'

interface LanguageProviderProps {
  children: React.ReactNode
}

const messages: Record<Locale, typeof en> = {
  en,
  pt,
}

const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  const locale = useLocale()

  useMemo(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  )
}

export default LanguageProvider
