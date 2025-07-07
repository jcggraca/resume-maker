import type { FC } from 'react'
import { Trash2 } from 'lucide-react'
import { useIntl } from 'react-intl'
import Button from '../Button/Button'

interface DeleteButtonProps {
  textId: string
  onClick: () => void
}

const DeleteButton: FC<DeleteButtonProps> = ({ textId, onClick }) => {
  const intl = useIntl()

  return (
    <Button onClick={onClick}>
      <Trash2 size={16} />
      {intl.formatMessage({ id: 'delete' })}
      {' '}
      {intl.formatMessage({ id: textId })}
    </Button>
  )
}

export default DeleteButton
