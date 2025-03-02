import type { FC, TextareaHTMLAttributes } from 'react'
import styles from './TextArea.module.css'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  label?: string
  error?: string
  hideLabel?: boolean
}

const TextArea: FC<TextAreaProps> = ({ name, label, value, onChange, error, hideLabel, ...rest }) => {
  return (
    <div className={styles.root}>
      {label && (
        <label htmlFor={name} className={hideLabel ? 'sr-only' : styles.label}>
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={styles.textArea}
        {...rest}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  )
}

export default TextArea
