import { useIntl } from 'react-intl'
import { useResumeStore } from '../../store/useResumeStore'
import OrderButtons from '../OrderButtons/OrderButtons'
import AddButton from '../ui/AddButton/AddButton'
import DeleteButton from '../ui/DeleteButton/DeleteButton'
import Input from '../ui/Input/Input'

export default function Languages() {
  const intl = useIntl()
  const { languages, addLanguage, updateLanguage, removeLanguage } = useResumeStore()

  return (
    <section id="languages" className="section">
      <h2>{intl.formatMessage({ id: 'languages' })}</h2>

      {languages
        .sort((a, b) => a.order - b.order)
        .map(language => (
          <div className="card" key={language.id}>
            <div className="flexForm">
              <Input
                label={intl.formatMessage({ id: 'name' })}
                name={`language-name-${language.id}`}
                placeholder={intl.formatMessage({ id: 'portuguese' })}
                value={language.name}
                onChange={e => updateLanguage({ id: language.id, name: e.target.value })}
              />
              <Input
                label={intl.formatMessage({ id: 'level' })}
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
