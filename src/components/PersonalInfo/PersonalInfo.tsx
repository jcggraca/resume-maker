import messages from '../../i18n/messages'
import { useFormatMessage } from '../../i18n/useFormatMessage'
import PersonalField from './PersonalField'
import SummaryField from './SummaryField'

export default function PersonalInfo() {
  const t = useFormatMessage()

  return (
    <section id="personal" className="section">
      <h2>{t(messages.personalInfo)}</h2>

      <div className="formGrid">
        <PersonalField
          field="name"
          name="name"
          label={t(messages.name)}
          placeholder="John Doe"
        />
        <PersonalField
          field="email"
          name="email"
          label={t(messages.email)}
          type="email"
          placeholder="mail@mail.com"
        />
        <PersonalField
          field="linkedin"
          name="linkedin"
          label={t(messages.linkedin)}
          placeholder="https://linkedin.com/in/john"
        />
        <PersonalField
          field="phone"
          name="phone"
          label={t(messages.phone)}
          type="tel"
          placeholder="+351 919191919"
        />
        <PersonalField
          field="github"
          name="github"
          label={t(messages.github)}
          placeholder="https://github.com/john"
        />
        <PersonalField
          field="location"
          name="location"
          label={t(messages.location)}
          placeholder="Lisbon, Portugal"
        />
        <PersonalField
          field="website"
          name="website"
          label={t(messages.personalWebsite)}
          placeholder="https://john.dev"
        />
        <PersonalField
          field="jobTitle"
          name="job-title"
          label={t(messages.jobTitle)}
          placeholder="Software Engineer"
        />
      </div>

      <SummaryField
        title={t(messages.summary)}
        placeholder="Software Engineer with X years of experience..."
        label={t(messages.professionalSummary)}
      />
    </section>
  )
}
