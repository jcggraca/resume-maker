import type { PersonalInfo } from '../../utils/types'
import { usePersonalStore } from '../../store/personalStore'
import Input from '../ui/Input/Input'

interface PersonalFieldProps {
  field: keyof PersonalInfo
  label: string
  name: string
  placeholder?: string
  type?: string
}

export default function PersonalField({
  field,
  label,
  name,
  placeholder,
  type = 'text',
}: PersonalFieldProps) {
  const value = usePersonalStore((state) => state[field])
  const setPersonalInfo = usePersonalStore((state) => state.setPersonalInfo)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({ [field]: e.target.value })
  }

  return (
    <Input
      value={value}
      onChange={handleChange}
      name={name}
      label={label}
      type={type}
      placeholder={placeholder}
    />
  )
}
