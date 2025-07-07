import { useIntl } from 'react-intl'
import { useResumeStore } from '../../store/useResumeStore'
import OrderButtons from '../OrderButtons/OrderButtons'
import Input from '../ui/Input/Input'
import TextArea from '../ui/TextArea/TextArea'
import AddButton from '../ui/AddButton/AddButton'
import DeleteButton from '../ui/DeleteButton/DeleteButton'

export default function Skills() {
  const intl = useIntl()
  const { skills, addSkill, updateSkill, removeSkill } = useResumeStore()

  return (
    <section id="skills" className="section">
      <h2>{intl.formatMessage({ id: 'skills' })}</h2>

      {skills
        .sort((a, b) => a.order - b.order)
        .map(skill => (
          <div className="card" key={skill.id}>
            <div>
              <Input
                label={intl.formatMessage({ id: 'category' })}
                name={`skill-category-${skill.id}`}
                placeholder="Front End"
                value={skill.name}
                onChange={e => updateSkill({ id: skill.id, name: e.target.value })}
                style={{
                  marginBottom: '1rem',
                }}
              />
              <TextArea
                label={intl.formatMessage({ id: 'description' })}
                name={`skill-description-${skill.id}`}
                placeholder="Javascript, Typescript, React, Teamwork, ..."
                value={skill.description}
                onChange={e => updateSkill({ id: skill.id, description: e.target.value })}
              />
            </div>

            <div className="flexBetween">
              <OrderButtons
                item={skill}
                list={skills}
                onClick={updateSkill}
              />

              <DeleteButton textId="skill" onClick={() => removeSkill(skill.id)} />
            </div>
          </div>
        ))}

      <AddButton textId="skill" onClick={addSkill} />
    </section>
  )
}
