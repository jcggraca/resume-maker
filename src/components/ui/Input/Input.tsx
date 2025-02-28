import type { FC, InputHTMLAttributes, Ref } from 'react'
import styles from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  error?: string
  ref?: Ref<HTMLInputElement>
}

const Input: FC<InputProps> = ({ name, label, value, onChange, error, ref, ...rest }) => {
  return (
    <div className={styles.root}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        ref={ref}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={styles.input}
        {...rest}
      />
      {error && <p className="errorMessage">{error}</p>}
    </div>
  )
}

export default Input
