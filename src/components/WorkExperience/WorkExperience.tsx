import { ArrowDown, ArrowUp, CirclePlus, Trash2 } from 'lucide-react'
import { useResumeStore } from '../../store/useResumeStore'
import { handleDateChange } from '../../utils/form'
import Button from '../ui/Button/Button'
import Input from '../ui/Input/Input'
import TextArea from '../ui/TextArea/TextArea'
import styles from './WorkExperience.module.css'

export default function WorkExperience() {
  const { works, addWork, updateWork, addWorkPoint, updateWorkPoint, removeWorkPoint, removeWork } = useResumeStore()

  return (
    <section id="work" className="section">
      <h2>Work Experience</h2>

      {works.map(work => (
        <div className="card" key={work.id}>
          <div className="formGrid">
            <Input
              onChange={e => updateWork({ id: work.id, company: e.target.value })}
              name="company"
              label="Company Name"
              placeholder="Company Name"
              value={work.company}
            />
            <Input
              onChange={e => updateWork({ id: work.id, role: e.target.value })}
              name="roleTitle"
              label="Role Title"
              placeholder="Role Title"
              value={work.role}
            />
            <Input
              onChange={e => updateWork({ id: work.id, startDate: handleDateChange(e.target.value) })}
              type="month"
              name="startDate"
              label="Start Date"
              placeholder="Start Date"
              value={work.startDate ? new Date(work.startDate).toISOString().substring(0, 7) : ''}
            />
            <div>
              <Input
                onChange={e => updateWork({ id: work.id, endDate: handleDateChange(e.target.value) })}
                type="month"
                name="endDate"
                label="End Date"
                placeholder="End Date"
                value={work.endDate ? new Date(work.endDate).toISOString().substring(0, 7) : ''}
                disabled={work.currentlyWorking}
              />
              <label>
                <input
                  type="checkbox"
                  checked={work.currentlyWorking}
                  onChange={e => updateWork({ id: work.id, currentlyWorking: e.target.checked })}
                />
                Currently work here
              </label>
            </div>

            <Input
              onChange={e => updateWork({ id: work.id, location: e.target.value })}
              name="location"
              label="Location"
              placeholder="Location"
              value={work.location}
            />
          </div>

          <label className={styles.label}>Bullet Points</label>

          {work.points
            .sort((a, b) => a.order - b.order)
            .map(point => (
              <div className={`flexArea ${styles.point}`} key={point.id}>
                <TextArea
                  name="workDescription"
                  value={point.description}
                  onChange={e => updateWorkPoint(work.id, point.id, point.order, e.target.value)}
                />
                <Button
                  variant="borderless"
                  onClick={() => updateWorkPoint(work.id, point.id, point.order - 1)}
                  disabled={point.order === 0}
                >
                  <ArrowUp size={16} />
                </Button>
                <Button
                  variant="borderless"
                  onClick={() => updateWorkPoint(work.id, point.id, point.order + 1)}
                  disabled={point.order === work.points.length - 1}
                >
                  <ArrowDown size={16} />
                </Button>
                <Button variant="borderless" onClick={() => removeWorkPoint(work.id, point.id)}>
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}

          <Button onClick={() => addWorkPoint(work.id)}>Add Bullet Point</Button>

          <div className="flexBetween">
            <div>
              <Button
                variant="borderless"
                disabled={work.order === 0}
                onClick={() => updateWork({ id: work.id, order: work.order - 1 })}
              >
                <ArrowUp size={16} />
              </Button>
              <Button
                variant="borderless"
                disabled={work.order === works.length - 1}
                onClick={() => updateWork({ id: work.id, order: work.order + 1 })}
              >
                <ArrowDown size={16} />
              </Button>
            </div>
            <Button variant="borderless" onClick={() => removeWork(work.id)}>
              <Trash2 size={16} />
              Remove Work
            </Button>
          </div>
        </div>
      ))}

      <Button onClick={addWork}>
        <CirclePlus size={16} />
        Add Work
      </Button>
    </section>
  )
}
