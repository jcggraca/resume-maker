import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { useResumeStore } from '../../../store/useResumeStore'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#112131',
    borderBottomStyle: 'solid',
    alignItems: 'stretch',
  },
  detailColumn: {
    flexDirection: 'column',
    flexGrow: 9,
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Lato Bold',
  },
  subtitle: {
    fontSize: 10,
    justifySelf: 'flex-end',
    fontFamily: 'Lato',
  },
})

function Header() {
  const { personalInfo } = useResumeStore()

  return (
    <View style={styles.container}>
      <View style={styles.detailColumn}>
        <Text style={styles.name}>{personalInfo.name ?? 'Your Name'}</Text>
        <Text style={styles.subtitle}>{personalInfo.jobTitle ?? 'Job Title'}</Text>
      </View>
    </View>
  )
}

export default Header
