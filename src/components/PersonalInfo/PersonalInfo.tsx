import { useResumeStore } from '../../store/useResumeStore'
import Input from '../ui/Input/Input'
import TextArea from '../ui/TextArea/TextArea'

export default function PersonalInfo() {
  const { personalInfo, setPersonalInfo } = useResumeStore()
  return (
    <section id="personal" className="section">
      <h2>Personal Info</h2>

      <div className="formGrid">
        <Input
          value={personalInfo.name}
          onChange={e => setPersonalInfo({ name: e.target.value })}
          name="name"
          label="Name"
          type="name"
          placeholder="John Doe"
        />
        <Input
          value={personalInfo.email}
          onChange={e => setPersonalInfo({ email: e.target.value })}
          name="email"
          label="Email"
          type="email"
          placeholder="mail@mail.com"
        />
        <Input
          value={personalInfo.linkedin}
          onChange={e => setPersonalInfo({ linkedin: e.target.value })}
          name="linkedin"
          label="Linkedin"
          type="name"
          placeholder="https://www.linkedin.com/in/john/"
        />
        <Input
          value={personalInfo.phone}
          onChange={e => setPersonalInfo({ phone: e.target.value })}
          name="phone"
          label="Phone"
          type="tel"
          placeholder="+351 919191919"
        />
        <Input
          value={personalInfo.github}
          onChange={e => setPersonalInfo({ github: e.target.value })}
          name="github"
          label="Github"
          type="name"
          placeholder="https://github.com/john"
        />
        <Input
          value={personalInfo.location}
          onChange={e => setPersonalInfo({ location: e.target.value })}
          name="location"
          label="Location"
          type="name"
          placeholder="Lisbon, Portugal"
        />
        <Input
          value={personalInfo.website}
          onChange={e => setPersonalInfo({ website: e.target.value })}
          name="website"
          label="Personal site"
          type="name"
          placeholder="https://john.dev/"
        />
        <Input
          value={personalInfo.jobTitle}
          onChange={e => setPersonalInfo({ jobTitle: e.target.value })}
          name="job-title"
          label="Job Title"
          type="name"
          placeholder="Software Engineer"
        />
      </div>

      <h2>Summary</h2>

      <TextArea
        value={personalInfo.summary}
        onChange={e => setPersonalInfo({ summary: e.target.value })}
        name="summary"
        placeholder="Software Engineer with X years of full stack web development..."
      />
    </section>
  )
}
