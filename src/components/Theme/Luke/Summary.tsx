import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { useResumeStore } from '../../../store/useResumeStore'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 15,
  },
  text: {
    fontFamily: 'Lato',
    fontSize: 10,
  },
})

function Summary() {
  const { personalInfo } = useResumeStore()

  if (personalInfo.summary) return (
    <View style={styles.container}>
      <Text style={styles.text}>{personalInfo.summary}</Text>
    </View>
  )

  return false
}

export default Summary
