import { CirclePlus, Trash2 } from 'lucide-react'
import { useIntl } from 'react-intl'
import { useResumeStore } from '../../store/useResumeStore'
import OrderButtons from '../OrderButtons/OrderButtons'
import Button from '../ui/Button/Button'
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
                label={`
                  ${intl.formatMessage({ id: 'language' })}
                  ${' '}
                  ${intl.formatMessage({ id: 'name' })}  
                `}
                name={`language-name-${language.id}`}
                placeholder={intl.formatMessage({ id: 'portuguese' })}
                value={language.name}
                onChange={e => updateLanguage({ id: language.id, name: e.target.value })}
              />
              <Input
                label={`
                  ${intl.formatMessage({ id: 'language' })}
                  ${' '}
                  ${intl.formatMessage({ id: 'level' })}
                `}
                name={`language-description-${language.id}`}
                placeholder="B1"
                value={language.level}
                onChange={e => updateLanguage({ id: language.id, level: e.target.value })}
              />
            </div>

            <div className="flexBetween">
              <div>
                <OrderButtons
                  item={language}
                  list={languages}
                  onClick={updateLanguage}
                />
              </div>
              <Button variant="borderless" onClick={() => removeLanguage(language.id)}>
                <Trash2 size={16} />
                {intl.formatMessage({ id: 'delete' })}
                {' '}
                {intl.formatMessage({ id: 'language' })}
              </Button>
            </div>
          </div>
        ))}

      <Button onClick={addLanguage}>
        <CirclePlus size={16} />
        {intl.formatMessage({ id: 'add' })}
        {' '}
        {intl.formatMessage({ id: 'language' })}
      </Button>
    </section>
  )
}
