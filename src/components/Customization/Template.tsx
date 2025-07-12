import { useCustomizationActions, useTemplate } from '../../store/customizationStore'
import { TEMPLATES } from '../../utils/customization'
import Button from '../ui/Button/Button'
import styles from './Customization.module.css'

export default function Template() {
  const template = useTemplate()
  const { setTemplate } = useCustomizationActions()

  return (
    <div className={styles.list}>
      {TEMPLATES.map(item => (
        <Button
          key={item.name}
          onClick={() => setTemplate(item.name)}
          className={`
              ${styles.card}
              ${template === item.name && styles.activeCard}
            `}
        >
          {item.name}
        </Button>
      ))}
    </div>
  )
}
