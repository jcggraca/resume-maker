import messages from '../../i18n/messages'
import { useFormatMessage } from '../../i18n/useFormatMessage'
import { useHobbies, useHobbyActions } from '../../store/hobbyStore'
import TextArea from '../ui/TextArea/TextArea'

export default function Hobbies() {
  const t = useFormatMessage()

  const hobbies = useHobbies()
  const { updateHobbies } = useHobbyActions()

  return (
    <section id="hobbies">
      <h2>{t(messages.hobbies)}</h2>

      <div className="card">
        <b>{t(messages.putOnly)}</b>
        <ul>
          <li>{t(messages.demonstrateSkills)}</li>
          <li>{t(messages.makeMemorable)}</li>
          <li>{t(messages.earlyCareer)}</li>
        </ul>

        <p>{t(messages.avoidGeneric)}</p>

        <TextArea
          value={hobbies}
          onChange={e => updateHobbies(e.target.value)}
          name="hobbies"
          placeholder="Self-hosting, 3D printing, Open-source contributions, Hackathons, ..."
          label={t(messages.hobbies)}
          rows={5}
        />
      </div>
    </section>
  )
}
