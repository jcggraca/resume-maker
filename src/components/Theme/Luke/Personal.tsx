import { Link, StyleSheet, View } from '@react-pdf/renderer'
import { useResumeStore } from '../../../store/useResumeStore'

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  link: {
    fontFamily: 'Lato',
    fontSize: 10,
    color: 'black',
    textDecoration: 'none',
  },
})

function Personal() {
  const { personalInfo } = useResumeStore()

  return (
    <View style={styles.container}>
      {personalInfo.linkedin && (
        <Link href={personalInfo.linkedin} style={styles.link}>
          Linkedin
        </Link>
      )}
      {personalInfo.github && (
        <Link href={personalInfo.github} style={styles.link}>
          Github
        </Link>
      )}
      <Link href={`mailto:${personalInfo.email}`} style={styles.link}>
        {personalInfo.email ?? 'email@email.null'}
      </Link>
    </View>
  )
}

export default Personal
