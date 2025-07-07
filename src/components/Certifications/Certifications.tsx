import { CirclePlus, Trash2 } from 'lucide-react'
import { useIntl } from 'react-intl'
import { useResumeStore } from '../../store/useResumeStore'
import OrderButtons from '../OrderButtons/OrderButtons'
import Button from '../ui/Button/Button'
import Input from '../ui/Input/Input'

export default function Certifications() {
  const intl = useIntl()
  const { certifications, addCertification, updateCertification, removeCertification } = useResumeStore()

  return (
    <section id="certifications" className='section'>
      <h2>{intl.formatMessage({ id: 'certifications' })}</h2>

      {certifications
        .sort((a, b) => a.order - b.order)
        .map(certification => (
          <div className="card" key={certification.id}>
            <div className="formGrid">
              <Input
                label={intl.formatMessage({ id: 'name' })}
                name={`certification-name-${certification.id}`}
                placeholder={intl.formatMessage({ id: 'name' })}
                value={certification.name}
                onChange={e => updateCertification({ id: certification.id, name: e.target.value })}
              />
              <Input
                label={intl.formatMessage({ id: 'description' })}
                name={`certification-description-${certification.id}`}
                placeholder={intl.formatMessage({ id: 'description' })}
                value={certification.description}
                onChange={e => updateCertification({ id: certification.id, description: e.target.value })}
              />
              <Input
                label={intl.formatMessage({ id: 'date' })}
                name={`certification-date-${certification.id}`}
                placeholder="2016"
                value={certification.date}
                onChange={e => updateCertification({ id: certification.id, date: e.target.value })}
              />
            </div>

            <div className="flexBetween">
              <div>
                <OrderButtons
                  item={certification}
                  list={certifications}
                  onClick={updateCertification}
                />
              </div>
              <Button variant="borderless" onClick={() => removeCertification(certification.id)}>
                <Trash2 size={16} />
                {intl.formatMessage({ id: 'delete' })}
                {' '}
                {intl.formatMessage({ id: 'certification' })}
              </Button>
            </div>
          </div>
        ))}

      <Button onClick={addCertification}>
        <CirclePlus size={16} />
        {intl.formatMessage({ id: 'add' })}
        {' '}
        {intl.formatMessage({ id: 'certification' })}
      </Button>
    </section>
  )
}
