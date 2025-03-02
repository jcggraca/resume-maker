import styles from './Footer.module.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      @
      {currentYear}
      {' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://joaograca.dev"
      >
        João Graça
      </a>
    </footer>
  )
}
