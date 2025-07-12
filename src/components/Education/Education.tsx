import messages from '../../i18n/messages'
import { useFormatMessage } from '../../i18n/useFormatMessage'
import { useEducation, useEducationActions } from '../../store/educationStore'
import OrderButtons from '../OrderButtons/OrderButtons'
import AddButton from '../ui/AddButton/AddButton'
import DeleteButton from '../ui/DeleteButton/DeleteButton'
import EducationItem from './EducationItem'

export default function Education() {
  const t = useFormatMessage()
  const education = useEducation()
  const { addEducation, updateEducation, removeEducation } = useEducationActions()

  return (
    <section id="education" className="section">
      <h2>{t(messages.education)}</h2>

      {education.map(item => (
        <div key={item.id} className="card">
          <EducationItem id={item.id} />
          <div className="flexBetween">
            <OrderButtons item={item} list={education} onClick={updateEducation} />
            <DeleteButton textId="education" onClick={() => removeEducation(item.id)} />
          </div>
        </div>
      ))}

      <AddButton textId="education" onClick={addEducation} />
    </section>
  )
}
