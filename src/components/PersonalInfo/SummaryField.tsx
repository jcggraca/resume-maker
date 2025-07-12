import { useCallback } from 'react'
import { usePersonalActions, usePersonalField } from '../../store/personalStore'
import TextArea from '../ui/TextArea/TextArea'

interface SummaryFieldProps {
  title: string
  label: string
  placeholder?: string
}

export function SummaryField({
  title,
  label,
  placeholder,
}: SummaryFieldProps) {
  const summary = usePersonalField('summary')
  const { setPersonalInfo } = usePersonalActions()

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPersonalInfo({ summary: e.target.value })
  }, [setPersonalInfo])

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
