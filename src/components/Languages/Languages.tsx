import { ArrowDown, ArrowUp, CirclePlus, Trash2 } from 'lucide-react'
import { useResumeStore } from '../../store/useResumeStore'
import Button from '../ui/Button/Button'
import Input from '../ui/Input/Input'

export default function Languages() {
  const { languages, addLanguage, updateLanguage, removeLanguage } = useResumeStore()

  return (
    <section id="languages" className="section">
      <h2>Languages</h2>

      {languages
        .sort((a, b) => a.order - b.order)
        .map(language => (
          <div className="card" key={language.id}>
            <div className="flexForm">
              <Input
                label="Language Name"
                name="language-name"
                placeholder="Language Name"
                value={language.name}
                onChange={e => updateLanguage({ id: language.id, name: e.target.value })}
              />
              <Input
                label="Language Level"
                name="language-description"
                placeholder="Language Level"
                value={language.level}
                onChange={e => updateLanguage({ id: language.id, level: e.target.value })}
              />
            </div>

            <div className="flexBetween">
              <div>
                <Button
                  variant="borderless"
                  disabled={language.order === 0}
                  onClick={() => updateLanguage({ id: language.id, order: language.order - 1 })}
                >
                  <ArrowUp size={16} />
                </Button>
                <Button
                  variant="borderless"
                  disabled={language.order === languages.length - 1}
                  onClick={() => updateLanguage({ id: language.id, order: language.order + 1 })}
                >
                  <ArrowDown size={16} />
                </Button>
              </div>
              <Button variant="borderless" onClick={() => removeLanguage(language.id)}>
                <Trash2 size={16} />
                Delete Language
              </Button>
            </div>
          </div>
        ))}

      <Button onClick={addLanguage}>
        <CirclePlus size={16} />
        Add Language
      </Button>
    </section>
  )
}
