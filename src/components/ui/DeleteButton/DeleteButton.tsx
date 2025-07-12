import type { FC } from 'react'
import { Trash2 } from 'lucide-react'
import messages from '../../../i18n/messages'
import { useFormatMessage } from '../../../i18n/useFormatMessage'
import Button from '../Button/Button'

interface DeleteButtonProps {
  textId: string
  onClick: () => void
}

const DeleteButton: FC<DeleteButtonProps> = ({ textId, onClick }) => {
  const t = useFormatMessage()

  return (
    <Button onClick={onClick}>
      <Trash2 size={16} />
      {t(messages.delete)}
      {' '}
      {t(messages[textId as keyof typeof messages])}
    </Button>
  )
}

export default DeleteButton
