import type { FC } from 'react'
import { useMemo } from 'react'
import { IntlProvider } from 'react-intl'
import { messages } from '.'
import { useSettingsStore } from '../store/useSettingsStore'

interface LanguageProviderProps {
  children: React.ReactNode
}

const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  const language = useSettingsStore(state => state.language)

  useMemo(() => {
    document.documentElement.lang = language
  }, [language])

  return (
    <IntlProvider locale={language} messages={messages[language as keyof typeof messages]}>
      {children}
    </IntlProvider>
  )
}

export default LanguageProvider
