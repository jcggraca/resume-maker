import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import styles from './Nav.module.css'

interface Link {
  url: string
  label: string
}

const links: Link[] = [
  { url: '#tips', label: 'tips' },
  { url: '#preview', label: 'preview' },
  { url: '#personal', label: 'personalInfo' },
  { url: '#work', label: 'workExperience' },
  { url: '#education', label: 'education' },
  { url: '#skills', label: 'skills' },
  { url: '#languages', label: 'languages' },
  { url: '#certifications', label: 'certifications' },
]

export default function Nav() {
  const intl = useIntl()
  const [activeLink, setActiveLink] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2
      let found = false

      links.forEach((link) => {
        const section = document.querySelector(link.url) as HTMLElement
        if (section) {
          const sectionTop = section.offsetTop
          const sectionBottom = sectionTop + section.offsetHeight

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveLink(link.url)
            found = true
          }
        }
      })

      if (!found) {
        setActiveLink('')
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className={styles.root}>
      <ul>
        {links.map(link => (
          <li key={link.url}>
            <a
              className={`${styles.link} ${activeLink === link.url ? styles.isActive : ''}`}
              href={link.url}
            >
              {intl.formatMessage({ id: link.label })}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
