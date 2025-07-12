import type { FC } from 'react'
import type { Certification, Education, Language, Skill, Work, WorkPoint } from '../../utils/types'
import { ArrowDown, ArrowUp } from 'lucide-react'
import messages from '../../i18n/messages'
import { useFormatMessage } from '../../i18n/useFormatMessage'
import Button from '../ui/Button/Button'

interface OrderButtonsProps {
  list: WorkPoint[] | Work[] | Skill[] | Language[] | Education[] | Certification[]
  item: WorkPoint | Work | Skill | Language | Education | Certification
  onClick: (args: { id: string, order: number }) => void
}

const OrderButtons: FC<OrderButtonsProps> = ({ item, list, onClick }) => {
  const t = useFormatMessage()

  return (
    <div>
      <Button
        variant="borderless"
        disabled={item.order === 0}
        onClick={() => onClick({ id: item.id, order: item.order - 1 })}
        aria-label={t(messages.moveItemUp)}
        onlyIcon
      >
        <ArrowUp size={16} />
      </Button>
      <Button
        variant="borderless"
        disabled={item.order === list.length - 1}
        onClick={() => onClick({ id: item.id, order: item.order + 1 })}
        aria-label={t(messages.moveItemDown)}
        onlyIcon
      >
        <ArrowDown size={16} />
      </Button>
    </div>
  )
}

export default OrderButtons
