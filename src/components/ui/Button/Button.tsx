import type { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'borderless'
  onlyIcon?: boolean
}

const Button: FC<ButtonProps> = ({ children, variant = 'primary', onlyIcon, ...props }) => {
  return (
    <button
      type={props.type || 'button'}
      className={`
        ${styles.button}
        ${variant === 'primary' ? styles.buttonPrimary : ''}
        ${variant === 'secondary' ? styles.buttonSecondary : ''}
        ${variant === 'borderless' ? styles.buttonBorderless : ''}
        ${onlyIcon ? styles.buttonIcon : ''}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
