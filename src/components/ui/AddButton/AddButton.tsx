import type { FC } from 'react'
import { CirclePlus } from 'lucide-react'
import messages from '../../../i18n/messages'
import { useFormatMessage } from '../../../i18n/useFormatMessage'
import Button from '../Button/Button'

interface AddButtonProps {
  textId: string
  onClick: () => void
}

const AddButton: FC<AddButtonProps> = ({ textId, onClick }) => {
  const t = useFormatMessage()

  return (
    <Button onClick={onClick}>
      <CirclePlus size={16} />
      {t(messages.add)}
      {' '}
      {t(messages[textId as keyof typeof messages])}
    </Button>
  )
}

export default AddButton
