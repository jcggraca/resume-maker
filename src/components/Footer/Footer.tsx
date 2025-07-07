import styles from './Footer.module.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      ©
      {currentYear}
      {' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://joaograca.dev"
      >
        João Graça
      </a>
      {' '}
      — If you liked this app, consider giving it a star on
      {' '}
      {' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/jcggraca/resume-maker"
      >
        Github
      </a>
    </footer>
  )
}
