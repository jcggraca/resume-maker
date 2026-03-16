import TextArea from '../ui/TextArea/TextArea'
import { usePersonalStore } from '../../store/personalStore'

interface SummaryFieldProps {
  title: string
  label: string
  placeholder?: string
}

export default function SummaryField({
  title,
  label,
  placeholder,
}: SummaryFieldProps) {
  const summary = usePersonalStore((state) => state.summary)
  const setPersonalInfo = usePersonalStore((state) => state.setPersonalInfo)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPersonalInfo({ summary: e.target.value })
  }

  return (
    <>
      <h2>{title}</h2>

      <TextArea
        value={summary}
        onChange={e => handleChange(e)}
        name="personal-summary"
        placeholder={placeholder}
        label={label}
        rows={5}
      />
    </>
  )
}
