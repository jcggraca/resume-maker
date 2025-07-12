import messages from '../../i18n/messages'
import { useFormatMessage } from '../../i18n/useFormatMessage'
import { useLanguageActions, useLanguages } from '../../store/languageStore'
import OrderButtons from '../OrderButtons/OrderButtons'
import AddButton from '../ui/AddButton/AddButton'
import DeleteButton from '../ui/DeleteButton/DeleteButton'
import Input from '../ui/Input/Input'

export default function Languages() {
  const t = useFormatMessage()

  const languages = useLanguages()
  const { addLanguage, updateLanguage, removeLanguage } = useLanguageActions()

  return (
    <section id="languages" className="section">
      <h2>{t(messages.languages)}</h2>

      {languages
        .sort((a, b) => a.order - b.order)
        .map(language => (
          <div className="card" key={language.id}>
            <div className="flexForm">
              <Input
                label={t(messages.name)}
                name={`language-name-${language.id}`}
                placeholder={t(messages.portuguese)}
                value={language.name}
                onChange={e => updateLanguage({ id: language.id, name: e.target.value })}
              />
              <Input
                label={t(messages.level)}
                name={`language-description-${language.id}`}
                placeholder="B1"
                value={language.level}
                onChange={e => updateLanguage({ id: language.id, level: e.target.value })}
              />
            </div>

            <div className="flexBetween">
              <OrderButtons
                item={language}
                list={languages}
                onClick={updateLanguage}
              />

              <DeleteButton textId="language" onClick={() => removeLanguage(language.id)} />
            </div>
          </div>
        ))}

      <AddButton textId="language" onClick={addLanguage} />
    </section>
  )
}
