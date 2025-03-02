import { ArrowDown, ArrowUp, CirclePlus, Trash2 } from 'lucide-react'
import { useResumeStore } from '../../store/useResumeStore'
import OrderButtons from '../OrderButtons/OrderButtons'
import Button from '../ui/Button/Button'
import Input from '../ui/Input/Input'
import TextArea from '../ui/TextArea/TextArea'
import styles from './WorkExperience.module.css'
import { useIntl } from 'react-intl'
import CheckBox from '../ui/CheckBox/CheckBox'

export default function WorkExperience() {
  const intl = useIntl()
  const { works, addWork, updateWork, addWorkPoint, updateWorkPoint, removeWorkPoint, removeWork } = useResumeStore()

  return (
    <section id="work" className="section">
      <h2>{intl.formatMessage({ id: 'workExperience' })}</h2>

      {works.map(work => (
        <div className="card" key={work.id}>
          <div className="formGrid">
            <Input
              onChange={e => updateWork({ id: work.id, company: e.target.value })}
              name={`company-${work.id}`}
              label={`
                ${intl.formatMessage({ id: 'company' })}
                ${" "}
                ${intl.formatMessage({ id: 'name' })}  
              `}
              placeholder="Google"
              value={work.company}
            />
            <Input
              onChange={e => updateWork({ id: work.id, role: e.target.value })}
              name={`roleTitle-${work.id}`}
              label={intl.formatMessage({ id: 'roleTitle' })}
              placeholder="Team Lead"
              value={work.role}
            />
            <Input
              onChange={e => updateWork({ id: work.id, startDate: e.target.value })}
              name={`startDate-${work.id}`}
              label={intl.formatMessage({ id: 'startDate' })}
              placeholder="Jan 2016"
              value={work.startDate}
            />
            <div>
              <Input
                onChange={e => updateWork({ id: work.id, endDate: e.target.value })}
                name={`endDate-${work.id}`}
                label={intl.formatMessage({ id: 'endDate' })}
                placeholder={work.currentlyWorking ? intl.formatMessage({ id: 'present' }) : 'Jun 2019'}
                value={work.endDate}
                disabled={work.currentlyWorking}
              />
              <CheckBox
                checked={work.currentlyWorking}
                onChange={e => updateWork({ id: work.id, currentlyWorking: e.target.checked })}
                label={intl.formatMessage({ id: 'currentlyWorkHere' })}
              />
            </div>

            <Input
              onChange={e => updateWork({ id: work.id, location: e.target.value })}
              name={`location-${work.id}`}
              label={intl.formatMessage({ id: 'location' })}
              placeholder="Lisbon, Portugal"
              value={work.location}
            />
          </div>

          <p className={styles.label}>{intl.formatMessage({ id: 'bulletPoints' })}</p>

          {work.points
            .sort((a, b) => a.order - b.order)
            .map(point => (
              <div className={`flexArea ${styles.point}`} key={point.id}>
                <TextArea
                  label={intl.formatMessage({ id: 'workExperiencePoint' })}  
                  hideLabel
                  name={`work-point-description-${point.id}`}
                  value={point.description}
                  onChange={e => updateWorkPoint(work.id, point.id, point.order, e.target.value)}
                />
                <Button
                  variant="borderless"
                  onClick={() => updateWorkPoint(work.id, point.id, point.order - 1)}
                  disabled={point.order === 0}
                  aria-label={intl.formatMessage({ id: 'moveItemUp' })}
                  onlyIcon
                >
                  <ArrowUp size={16} />
                </Button>
                <Button
                  variant="borderless"
                  onClick={() => updateWorkPoint(work.id, point.id, point.order + 1)}
                  disabled={point.order === work.points.length - 1}
                  aria-label={intl.formatMessage({ id: 'moveItemDown' })}
                  onlyIcon
                >
                  <ArrowDown size={16} />
                </Button>
                <Button
                  aria-label={`
                    ${intl.formatMessage({ id: 'delete' })}
                    ${" "}
                    ${intl.formatMessage({ id: 'workExperiencePoint' })}  
                  `}
                  variant="borderless"
                  onClick={() => removeWorkPoint(work.id, point.id)}
                  onlyIcon
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}

          <Button onClick={() => addWorkPoint(work.id)}>
            {intl.formatMessage({ id: 'delete' })} {intl.formatMessage({ id: 'bulletPoints' })}
          </Button>

          <div className="flexBetween">
            <div>
              <OrderButtons
                item={work}
                list={works}
                onClick={updateWork}
              />
            </div>
            <Button variant="borderless" onClick={() => removeWork(work.id)}>
              <Trash2 size={16} />
              {intl.formatMessage({ id: 'delete' })} {intl.formatMessage({ id: 'work' })}
            </Button>
          </div>
        </div>
      ))}

      <Button onClick={addWork}>
        <CirclePlus size={16} />
        {intl.formatMessage({ id: 'add' })} {intl.formatMessage({ id: 'work' })}
      </Button>
    </section>
  )
}
