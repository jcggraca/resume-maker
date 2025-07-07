import type { FC } from 'react'
import type { Certification, Education, Language, Skill, Work, WorkPoint } from '../../store/useResumeStore'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { useIntl } from 'react-intl'
import Button from '../ui/Button/Button'

interface OrderButtonsProps {
  list: WorkPoint[] | Work[] | Skill[] | Language[] | Education[] | Certification[]
  item: WorkPoint | Work | Skill | Language | Education | Certification
  onClick: (args: { id: string, order: number }) => void
}

const OrderButtons: FC<OrderButtonsProps> = ({ item, list, onClick }) => {
  const intl = useIntl()

  return (
    <div>
      <Button
        variant="borderless"
        disabled={item.order === 0}
        onClick={() => onClick({ id: item.id, order: item.order - 1 })}
        aria-label={intl.formatMessage({ id: 'moveItemUp' })}
        onlyIcon
      >
        <ArrowUp size={16} />
      </Button>
      <Button
        variant="borderless"
        disabled={item.order === list.length - 1}
        onClick={() => onClick({ id: item.id, order: item.order + 1 })}
        aria-label={intl.formatMessage({ id: 'moveItemDown' })}
        onlyIcon
      >
        <ArrowDown size={16} />
      </Button>
    </div>
  )
}

export default OrderButtons
