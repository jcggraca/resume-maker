import { useCustomizationActions, useFont } from '../../store/customizationStore'
import { FONTS } from '../../utils/customization'
import Button from '../ui/Button/Button'
import styles from './Customization.module.css'

export default function Font() {
  const font = useFont()
  const { setFont } = useCustomizationActions()

  return (
    <div className={styles.list}>
      {FONTS.map(item => (
        <Button
          key={item.name}
          onClick={() => setFont(item.name)}
          className={`
                ${styles.card}
                ${font === item.name && styles.activeCard}
              `}
          style={{
            fontFamily: item.name,
          }}
        >
          <div style={{
            fontSize: '18px',
          }}
          >
            Aa
          </div>
          {item.name}
        </Button>
      ))}
    </div>
  )
}
