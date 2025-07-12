import type { FC } from 'react'
import type { Education } from '../../utils/types'
import { memo, useCallback } from 'react'
import messages from '../../i18n/messages'
import { useFormatMessage } from '../../i18n/useFormatMessage'
import { useEducationActions, useEducationItemById } from '../../store/educationStore'
import Input from '../ui/Input/Input'

interface EducationItemProps {
  id: string
}

const EducationItem: FC<EducationItemProps> = memo(({ id }) => {
  const t = useFormatMessage()
  const item = useEducationItemById(id)
  const { updateEducation } = useEducationActions()

  const handleChange = useCallback(
    (field: keyof Education, value: string) => {
      updateEducation({ id, [field]: value })
    },
    [id, updateEducation],
  )

  if (!item)
    return null

  return (
    <div className="formGrid">
      <Input
        onChange={e => handleChange('institution', e.target.value)}
        value={item.institution}
        name={`institution-name-${item.id}`}
        label={t(messages.name)}
        placeholder="Maastricht University"
      />
      <Input
        onChange={e => handleChange('degree', e.target.value)}
        value={item.degree}
        name={`education-degree-${item.id}`}
        label={t(messages.degree)}
        placeholder="Computer Science"
      />
      <Input
        onChange={e => handleChange('date', e.target.value)}
        value={item.date}
        name={`education-endDate-${item.id}`}
        label={t(messages.date)}
        placeholder="2016"
      />
    </div>
  )
})

export default EducationItem
