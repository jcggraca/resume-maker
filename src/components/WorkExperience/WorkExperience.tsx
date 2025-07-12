import { ArrowDown, ArrowUp, Trash2 } from 'lucide-react'
import messages from '../../i18n/messages'
import { useFormatMessage } from '../../i18n/useFormatMessage'
import { useWorkActions, useWorks } from '../../store/workStore'
import OrderButtons from '../OrderButtons/OrderButtons'
import AddButton from '../ui/AddButton/AddButton'
import Button from '../ui/Button/Button'
import CheckBox from '../ui/CheckBox/CheckBox'
import DeleteButton from '../ui/DeleteButton/DeleteButton'
import Input from '../ui/Input/Input'
import TextArea from '../ui/TextArea/TextArea'
import styles from './WorkExperience.module.css'

export default function WorkExperience() {
  const t = useFormatMessage()
  const works = useWorks()
  const { addWork, updateWork, removeWork, addWorkPoint, updateWorkPoint, removeWorkPoint } = useWorkActions()

  return (
    <section id="work" className="section">
      <h2>{t(messages.workExperience)}</h2>

      {works.map(work => (
        <div className="card" key={work.id}>
          <div className="formGrid">
            <Input
              onChange={e => updateWork({ id: work.id, company: e.target.value })}
              name={`company-${work.id}`}
              label={t(messages.companyName)}
              placeholder="Google"
              value={work.company}
            />
            <Input
              onChange={e => updateWork({ id: work.id, role: e.target.value })}
              name={`roleTitle-${work.id}`}
              label={t(messages.roleTitle)}
              placeholder="Team Lead"
              value={work.role}
            />
            <Input
              onChange={e => updateWork({ id: work.id, startDate: e.target.value })}
              name={`startDate-${work.id}`}
              label={t(messages.startDate)}
              placeholder="Jan 2016"
              value={work.startDate}
            />
            <div>
              <Input
                onChange={e => updateWork({ id: work.id, endDate: e.target.value })}
                name={`endDate-${work.id}`}
                label={t(messages.endDate)}
                placeholder={work.currentlyWorking ? t(messages.present) : 'Jun 2019'}
                value={work.endDate}
                disabled={work.currentlyWorking}
              />
              <CheckBox
                checked={work.currentlyWorking}
                onChange={e => updateWork({ id: work.id, currentlyWorking: e.target.checked })}
                label={t(messages.currentlyWorkHere)}
              />
            </div>

            <Input
              onChange={e => updateWork({ id: work.id, location: e.target.value })}
              name={`location-${work.id}`}
              label={t(messages.location)}
              placeholder="Lisbon, Portugal"
              value={work.location}
            />
          </div>

          <p className={styles.label}>{t(messages.bulletPoints)}</p>

          {work.points
            .sort((a, b) => a.order - b.order)
            .map(point => (
              <div className={`flexArea ${styles.point}`} key={point.id}>
                <TextArea
                  label={t(messages.workExperiencePoint)}
                  hideLabel
                  name={`work-point-description-${point.id}`}
                  value={point.description}
                  onChange={e => updateWorkPoint(work.id, point.id, point.order, e.target.value)}
                />
                <Button
                  variant="borderless"
                  onClick={() => updateWorkPoint(work.id, point.id, point.order - 1)}
                  disabled={point.order === 0}
                  aria-label={t(messages.moveItemUp)}
                  onlyIcon
                >
                  <ArrowUp size={16} />
                </Button>
                <Button
                  variant="borderless"
                  onClick={() => updateWorkPoint(work.id, point.id, point.order + 1)}
                  disabled={point.order === work.points.length - 1}
                  aria-label={t(messages.moveItemDown)}
                  onlyIcon
                >
                  <ArrowDown size={16} />
                </Button>
                <Button
                  aria-label={`
                    ${t(messages.delete)}
                    ${' '}
                    ${t(messages.workExperiencePoint)}  
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
            {t(messages.add)}
            {' '}
            {t(messages.bulletPoints)}
          </Button>

          <div className="flexBetween">
            <OrderButtons
              item={work}
              list={works}
              onClick={updateWork}
            />

            <DeleteButton textId="work" onClick={() => removeWork(work.id)} />
          </div>
        </div>
      ))}

      <AddButton textId="work" onClick={addWork} />
    </section>
  )
}
