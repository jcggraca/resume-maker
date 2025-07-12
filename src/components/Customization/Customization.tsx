import messages from '../../i18n/messages'
import { useFormatMessage } from '../../i18n/useFormatMessage'
import styles from './Customization.module.css'
import Font from './Font'
import Template from './Template'

export default function Customization() {
  const t = useFormatMessage()

  return (
    <section className="section" id="customization">
      <h2>{t(messages.customization)}</h2>

      <div className="card">
        <h3 className={styles.title}>{t(messages.template)}</h3>
        <Template />

        <h3>{t(messages.fonts)}</h3>
        <Font />
      </div>
    </section>
  )
}
