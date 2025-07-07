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
      </a>,
      {' '}
      check the code any give a star on{' '}
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
