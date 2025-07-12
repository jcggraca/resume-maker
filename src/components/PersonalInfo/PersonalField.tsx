import type { PersonalInfo } from '../../utils/types'
import { useCallback } from 'react'
import { usePersonalActions, usePersonalField } from '../../store/personalStore'
import Input from '../ui/Input/Input'

interface PersonalFieldProps {
  field: keyof PersonalInfo
  label: string
  name: string
  placeholder?: string
  type?: string
}

export function PersonalField({
  field,
  label,
  name,
  placeholder,
  type = 'text',
}: PersonalFieldProps) {
  const value = usePersonalField(field)
  const { setPersonalInfo } = usePersonalActions()

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({ [field]: e.target.value })
  }, [setPersonalInfo, field])

  return (
    <Input
      value={value as string}
      onChange={e => handleChange(e)}
      name={name}
      label={label}
      type={type}
      placeholder={placeholder}
    />
  )
}
