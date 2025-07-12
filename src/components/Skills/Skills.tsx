import messages from '../../i18n/messages'
import { useFormatMessage } from '../../i18n/useFormatMessage'
import { useSkillActions, useSkills } from '../../store/skillStore'
import OrderButtons from '../OrderButtons/OrderButtons'
import AddButton from '../ui/AddButton/AddButton'
import DeleteButton from '../ui/DeleteButton/DeleteButton'
import Input from '../ui/Input/Input'
import TextArea from '../ui/TextArea/TextArea'

export default function Skills() {
  const t = useFormatMessage()
  const skills = useSkills()
  const { addSkill, updateSkill, removeSkill } = useSkillActions()

  return (
    <section id="skills" className="section">
      <h2>{t(messages.skills)}</h2>

      {skills
        .sort((a, b) => a.order - b.order)
        .map(skill => (
          <div className="card" key={skill.id}>
            <Input
              label={t(messages.category)}
              name={`skill-category-${skill.id}`}
              placeholder="Front End"
              value={skill.name}
              onChange={e => updateSkill({ id: skill.id, name: e.target.value })}
              style={{
                marginBottom: '1rem',
              }}
            />
            <TextArea
              label={t(messages.description)}
              name={`skill-description-${skill.id}`}
              placeholder="Javascript, Typescript, React, Teamwork, ..."
              value={skill.description}
              onChange={e => updateSkill({ id: skill.id, description: e.target.value })}
            />

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
