import { useIntl } from 'react-intl'
import { useResumeStore } from '../../store/useResumeStore'
import Input from '../ui/Input/Input'
import TextArea from '../ui/TextArea/TextArea'

export default function PersonalInfo() {
  const intl = useIntl()
  const { personalInfo, setPersonalInfo } = useResumeStore()

  return (
    <section id="personal" className="section">
      <h2>{intl.formatMessage({ id: 'personalInfo' })}</h2>

      <div className="formGrid">
        <Input
          value={personalInfo.name}
          onChange={e => setPersonalInfo({ name: e.target.value })}
          name="name"
          label={intl.formatMessage({ id: 'name' })}
          placeholder="John Doe"
        />

        <Input
          value={personalInfo.email}
          onChange={e => setPersonalInfo({ email: e.target.value })}
          name="email"
          label={intl.formatMessage({ id: 'email' })}
          type="email"
          placeholder="mail@mail.com"
        />

        <Input
          value={personalInfo.linkedin}
          onChange={e => setPersonalInfo({ linkedin: e.target.value })}
          name="linkedin"
          label={intl.formatMessage({ id: 'linkedin' })}
          type="text"
          placeholder="https://www.linkedin.com/in/john/"
        />

        <Input
          value={personalInfo.phone}
          onChange={e => setPersonalInfo({ phone: e.target.value })}
          name="phone"
          label={intl.formatMessage({ id: 'phone' })}
          type="tel"
          placeholder="+351 919191919"
        />

        <Input
          value={personalInfo.github}
          onChange={e => setPersonalInfo({ github: e.target.value })}
          name="github"
          label={intl.formatMessage({ id: 'github' })}
          type="text"
          placeholder="https://github.com/john"
        />

        <Input
          value={personalInfo.location}
          onChange={e => setPersonalInfo({ location: e.target.value })}
          name="location"
          label={intl.formatMessage({ id: 'location' })}
          type="text"
          placeholder="Lisbon, Portugal"
        />

        <Input
          value={personalInfo.website}
          onChange={e => setPersonalInfo({ website: e.target.value })}
          name="website"
          label={intl.formatMessage({ id: 'personalWebsite' })}
          type="text"
          placeholder="https://john.dev/"
        />

        <Input
          value={personalInfo.jobTitle}
          onChange={e => setPersonalInfo({ jobTitle: e.target.value })}
          name="job-title"
          label={intl.formatMessage({ id: 'jobTitle' })}
          type="text"
          placeholder="Software Engineer"
        />
      </div>

      <h2>{intl.formatMessage({ id: 'summary' })}</h2>

      <TextArea
        value={personalInfo.summary}
        onChange={e => setPersonalInfo({ summary: e.target.value })}
        name="personal-summary"
        placeholder="Software Engineer with X years of full stack web development..."
        label={intl.formatMessage({ id: 'professionalSummary' })}
        rows={5}
      />
    </section>
  )
}
