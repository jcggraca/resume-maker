import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { useResumeStore } from '../../../store/useResumeStore'
import Title from './Title'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 15,
  },
  school: {
    fontFamily: 'Lato Bold',
    fontSize: 10,
  },
  degree: {
    fontFamily: 'Lato',
    fontSize: 10,
  },
})

function Education() {
  const { education } = useResumeStore()

  return (
    <View style={styles.container}>
      <Title>Education</Title>

      {education.map(item => (
        <span key={item.id}>
          <Text style={styles.school}>{item.institution}</Text>
          <Text style={styles.degree}>{item.degree}</Text>
        </span>
      ))}
    </View>
  )
}

export default Education
