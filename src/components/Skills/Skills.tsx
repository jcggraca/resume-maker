import { ArrowDown, ArrowUp, CirclePlus, Trash2 } from 'lucide-react'
import { useResumeStore } from '../../store/useResumeStore'
import Button from '../ui/Button/Button'
import Input from '../ui/Input/Input'
import TextArea from '../ui/TextArea/TextArea'

export default function Skills() {
  const { skills, addSkill, updateSkill, removeSkill } = useResumeStore()

  return (
    <section id="skills" className="section">
      <h2>Skills</h2>

      {skills
        .sort((a, b) => a.order - b.order)
        .map(skill => (
          <div className="card" key={skill.id}>
            <div>
              <Input
                label="Skill Category"
                name="skill-category"
                placeholder="Skill Category"
                value={skill.name}
                onChange={e => updateSkill({ id: skill.id, name: e.target.value })}
                style={{
                  marginBottom: '1rem',
                }}
              />
              <TextArea
                label="Skill Description"
                name="skill-description"
                placeholder="Javascript, Typescript, React, Teamwork, ..."
                value={skill.description}
                onChange={e => updateSkill({ id: skill.id, description: e.target.value })}
              />
            </div>

            <div className="flexBetween">
              <div>
                <Button
                  variant="borderless"
                  disabled={skill.order === 0}
                  onClick={() => updateSkill({ id: skill.id, order: skill.order - 1 })}
                >
                  <ArrowUp size={16} />
                </Button>
                <Button
                  variant="borderless"
                  disabled={skill.order === skills.length - 1}
                  onClick={() => updateSkill({ id: skill.id, order: skill.order + 1 })}
                >
                  <ArrowDown size={16} />
                </Button>
              </div>
              <Button variant="borderless" onClick={() => removeSkill(skill.id)}>
                <Trash2 size={16} />
                Delete Skill Category
              </Button>
            </div>
          </div>
        ))}

      <Button onClick={addSkill}>
        <CirclePlus size={16} />
        Add Skill
      </Button>
    </section>
  )
}
