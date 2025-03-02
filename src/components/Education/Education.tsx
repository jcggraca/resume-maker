import { CirclePlus, Trash2 } from 'lucide-react'
import { useResumeStore } from '../../store/useResumeStore'
import OrderButtons from '../OrderButtons/OrderButtons'
import Button from '../ui/Button/Button'
import Input from '../ui/Input/Input'
import { useIntl } from 'react-intl'

export default function Education() {
  const intl = useIntl()
  const { education, addEducation, updateEducation, removeEducation } = useResumeStore()

  return (
    <section id="education" className="section">
      <h2>{intl.formatMessage({ id: 'education' })}</h2>

      {education.map(item => (
        <div className="card" key={item.id}>
          <div className="formGrid">
            <Input
              onChange={e => updateEducation({ id: item.id, institution: e.target.value })}
              value={item.institution}
              name={`institution-name-${item.id}`}
              label={`
                ${intl.formatMessage({ id: 'institution' })}
                ${" "}
                ${intl.formatMessage({ id: 'name' })}  
              `}
              placeholder="Maastricht University"
            />
            <Input
              onChange={e => updateEducation({ id: item.id, degree: e.target.value })}
              value={item.degree}
              name={`education-degree-${item.id}`}
              label={intl.formatMessage({ id: 'degree' })}
              placeholder="Computer Science"
            />
            <Input
              onChange={e => updateEducation({ id: item.id, date: e.target.value })}
              value={item.date}
              name={`education-endDate-${item.id}`}
              label={intl.formatMessage({ id: 'date' })}
              placeholder="2016"
            />
          </div>

          <div className="flexBetween">
            <div>
              <OrderButtons
                item={item}
                list={education}
                onClick={updateEducation}
              />
            </div>
            <Button variant="borderless" onClick={() => removeEducation(item.id)}>
              <Trash2 size={16} />
              {intl.formatMessage({ id: 'delete' })} {intl.formatMessage({ id: 'education' })}
            </Button>
          </div>
        </div>
      ))}

      <Button onClick={addEducation}>
        <CirclePlus size={16} />
        {intl.formatMessage({ id: 'add' })} {intl.formatMessage({ id: 'education' })}
      </Button>
    </section>
  )
}
