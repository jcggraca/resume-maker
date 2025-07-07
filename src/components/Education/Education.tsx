import { useIntl } from 'react-intl'
import { useResumeStore } from '../../store/useResumeStore'
import OrderButtons from '../OrderButtons/OrderButtons'
import Input from '../ui/Input/Input'
import AddButton from '../ui/AddButton/AddButton'
import DeleteButton from '../ui/DeleteButton/DeleteButton'

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
              label={intl.formatMessage({ id: 'name' })}
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
            <OrderButtons
              item={item}
              list={education}
              onClick={updateEducation}
            />

            <DeleteButton textId="education" onClick={() => removeEducation(item.id)} />
          </div>
        </div>
      ))}

      <AddButton textId="education" onClick={addEducation} />
    </section>
  )
}
