import type { FC } from 'react'
import { CirclePlus } from 'lucide-react'
import { useIntl } from 'react-intl'
import Button from '../Button/Button'

interface AddButtonProps {
  textId: string
  onClick: () => void
}

const AddButton: FC<AddButtonProps> = ({ textId, onClick }) => {
  const intl = useIntl()

  return (
    <Button onClick={onClick}>
      <CirclePlus size={16} />
      {intl.formatMessage({ id: 'add' })}
      {' '}
      {intl.formatMessage({ id: textId })}
    </Button>
  )
}

export default AddButton
