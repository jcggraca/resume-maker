import messages from '../../i18n/messages'
import { useFormatMessage } from '../../i18n/useFormatMessage'
import { useCertificationActions, useCertifications } from '../../store/certificationStore'
import OrderButtons from '../OrderButtons/OrderButtons'
import AddButton from '../ui/AddButton/AddButton'
import DeleteButton from '../ui/DeleteButton/DeleteButton'
import Input from '../ui/Input/Input'

export default function Certifications() {
  const t = useFormatMessage()

  const certifications = useCertifications()
  const { addCertification, updateCertification, removeCertification } = useCertificationActions()

  return (
    <section id="certifications" className="section">
      <h2>{t(messages.certifications)}</h2>

      {certifications
        .sort((a, b) => a.order - b.order)
        .map(certification => (
          <div className="card" key={certification.id}>
            <div className="formGrid">
              <Input
                label={t(messages.name)}
                name={`certification-name-${certification.id}`}
                placeholder={t(messages.name)}
                value={certification.name}
                onChange={e => updateCertification({ id: certification.id, name: e.target.value })}
              />
              <Input
                label={t(messages.description)}
                name={`certification-description-${certification.id}`}
                placeholder={t(messages.description)}
                value={certification.description}
                onChange={e => updateCertification({ id: certification.id, description: e.target.value })}
              />
              <Input
                label={t(messages.date)}
                name={`certification-date-${certification.id}`}
                placeholder="2016"
                value={certification.date}
                onChange={e => updateCertification({ id: certification.id, date: e.target.value })}
              />
            </div>

            <div className="flexBetween">
              <OrderButtons
                item={certification}
                list={certifications}
                onClick={updateCertification}
              />

              <DeleteButton textId="certification" onClick={() => removeCertification(certification.id)} />
            </div>
          </div>
        ))}

      <AddButton textId="certification" onClick={addCertification} />
    </section>
  )
}
