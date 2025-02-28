import { ArrowDown, ArrowUp, CirclePlus, Trash2 } from 'lucide-react'
import { useResumeStore } from '../../store/useResumeStore'
import Button from '../ui/Button/Button'
import Input from '../ui/Input/Input'

export default function Certifications() {
  const { certifications, addCertifications, updateCertifications, removeCertifications } = useResumeStore()

  return (
    <section id="certifications">
      <h2>Certifications</h2>

      {certifications
        .sort((a, b) => a.order - b.order)
        .map(certification => (
          <div className="card" key={certification.id}>
            <div className="formGrid">
              <Input
                label="Certification Name"
                name="certification"
                placeholder="Certification Name"
                value={certification.name}
                onChange={e => updateCertifications({ id: certification.id, name: e.target.value })}
              />
              <Input
                label="Certification Description"
                name="certification-description"
                placeholder="Certification Description"
                value={certification.description}
                onChange={e => updateCertifications({ id: certification.id, description: e.target.value })}
              />
              <Input
                label="Certification Date"
                name="certification-date"
                placeholder="2014 - 2016"
                value={certification.date}
                onChange={e => updateCertifications({ id: certification.id, date: e.target.value })}
              />
            </div>

            <div className="flexBetween">
              <div>
                <Button
                  variant="borderless"
                  disabled={certification.order === 0}
                  onClick={() => updateCertifications({ id: certification.id, order: certification.order - 1 })}
                >
                  <ArrowUp size={16} />
                </Button>
                <Button
                  variant="borderless"
                  disabled={certification.order === certifications.length - 1}
                  onClick={() => updateCertifications({ id: certification.id, order: certification.order + 1 })}
                >
                  <ArrowDown size={16} />
                </Button>
              </div>
              <Button variant="borderless" onClick={() => removeCertifications(certification.id)}>
                <Trash2 size={16} />
                Delete Certification
              </Button>
            </div>
          </div>
        ))}

      <Button onClick={addCertifications}>
        <CirclePlus size={16} />
        Add Certification
      </Button>
    </section>
  )
}
