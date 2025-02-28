import { ArrowDown, ArrowUp, CirclePlus, Trash2 } from 'lucide-react'
import { useResumeStore } from '../../store/useResumeStore'
import Button from '../ui/Button/Button'
import Input from '../ui/Input/Input'

export default function Education() {
  const { education, addEducation, updateEducation, removeEducation } = useResumeStore()

  return (
    <section id="education" className="section">
      <h2>Education</h2>

      {education.map(item => (
        <div className="card" key={item.id}>
          <div className="formGrid">
            <Input
              onChange={e => updateEducation({ id: item.id, institution: e.target.value })}
              value={item.institution}
              name="institution"
              label="Institution Name"
              placeholder="Institution Name"
            />
            <Input
              onChange={e => updateEducation({ id: item.id, degree: e.target.value })}
              value={item.degree}
              name="degree"
              label="Degree"
              placeholder="Degree"
            />
            <Input
              onChange={e => updateEducation({ id: item.id, date: e.target.value })}
              value={item.date}
              name="endDate"
              label="Date"
              placeholder="Date"
            />
          </div>

          <div className="flexBetween">
            <div>
              <Button
                variant="borderless"
                disabled={item.order === 0}
                onClick={() => updateEducation({ id: item.id, order: item.order - 1 })}
              >
                <ArrowUp size={16} />
              </Button>
              <Button
                variant="borderless"
                disabled={item.order === education.length - 1}
                onClick={() => updateEducation({ id: item.id, order: item.order + 1 })}
              >
                <ArrowDown size={16} />
              </Button>
            </div>
            <Button variant="borderless" onClick={() => removeEducation(item.id)}>
              <Trash2 size={16} />
              Remove Education
            </Button>
          </div>
        </div>
      ))}

      <Button onClick={addEducation}>
        <CirclePlus size={16} />
        Add Education
      </Button>
    </section>
  )
}
