import type { FC, InputHTMLAttributes } from 'react'
import styles from './CheckBox.module.css'

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const CheckBox: FC<CheckBoxProps> = ({ label, ...rest }) => {
  return (
    <label className={styles.root}>
      <input
        type="checkbox"
        {...rest}
      />
      {label}
    </label>
  )
}

export default CheckBox
