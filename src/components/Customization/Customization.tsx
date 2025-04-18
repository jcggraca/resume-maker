import { useIntl } from 'react-intl'
import { useSettingsStore } from '../../store/useSettingsStore'
import Button from '../ui/Button/Button'
import styles from './Customization.module.css'

export default function Customization() {
  const intl = useIntl()
  const { font, template, setFont, setTemplate } = useSettingsStore()

  const templatesList = [
    {
      name: 'Standard',
      image: null,
    },
    {
      name: 'Minimal',
      image: null,
    },
    // {
    //   name: 'Luke',
    //   image: null,
    // },
  ]

  const fontsList = [
    {
      name: 'Roboto',
      image: null,
    },
    {
      name: 'Inter',
      image: null,
    },
    {
      name: 'PT Serif',
      image: null,
    },
    {
      name: 'Arimo',
      image: null,
    },
  ]

  return (
    <section className="section" id="customization">
      <h2>{intl.formatMessage({ id: 'customization' })}</h2>

      <div className="card">
        <h3 className={styles.title}>{intl.formatMessage({ id: 'template' })}</h3>
        <div className={styles.list}>
          {templatesList.map(item => (
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

        <h3>{intl.formatMessage({ id: 'fonts' })}</h3>
        <div className={styles.list}>
          {fontsList.map(item => (
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
      </div>
    </section>
  )
}
