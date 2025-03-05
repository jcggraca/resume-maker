import type { FC } from 'react'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import Button from '../ui/Button/Button'
import Input from '../ui/Input/Input'
import styles from './EditSectionTitle.module.css'

interface EditSectionTitleProps {
  title: string
  name: string
}

const EditSectionTitle: FC<EditSectionTitleProps> = ({ title, name }) => {
  const [editTitle, setEditTitle] = useState(false)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
  }

  return (
    editTitle
      ? (
          <form onSubmit={handleSubmit}>
            <Input
              name={`edit-${name}-section-title`}
            />
            <Button variant="secondary" type="submit">Save</Button>
          </form>
        )
      : (
          <div>
            <h2>{title}</h2>
            <Button onClick={() => setEditTitle(true)} variant="borderless">
              <Pencil />
            </Button>
          </div>
        )
  )
}

export default EditSectionTitle
