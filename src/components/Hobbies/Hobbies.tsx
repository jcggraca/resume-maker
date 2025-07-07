import { useIntl } from 'react-intl'
import { useResumeStore } from '../../store/useResumeStore'
import TextArea from '../ui/TextArea/TextArea'

export default function Hobbies() {
  const intl = useIntl()
  const { hobbies, updateHobbies } = useResumeStore()

  return (
    <section id="hobbies">
      <h2>{intl.formatMessage({ id: 'hobbies' })}</h2>

      <div className="card">
        <h4>{intl.formatMessage({ id: 'putOnly' })}</h4>
        <ul>
          <li>{intl.formatMessage({ id: 'demonstrateSkills' })}</li>
          <li>{intl.formatMessage({ id: 'makeMemorable' })}</li>
          <li>{intl.formatMessage({ id: 'earlyCareer' })}</li>
        </ul>
        
        <p>{intl.formatMessage({ id: 'avoidGeneric' })}</p>

        <TextArea
          value={hobbies}
          onChange={e => updateHobbies(e.target.value)}
          name="hobbies"
          placeholder="Self-hosting, 3D printing, Open-source contributions, Hackathons, ..."
          label={intl.formatMessage({ id: 'hobbies' })}
          rows={5}
        />
      </div>
    </section>
  )
}
