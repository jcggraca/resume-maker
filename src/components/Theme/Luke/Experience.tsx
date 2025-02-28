import type { Work } from '../../../store/useResumeStore'
import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { useResumeStore } from '../../../store/useResumeStore'
import List, { Item } from './List'
import Title from './Title'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 15,
  },
  entryContainer: {
    marginBottom: 10,
  },
  date: {
    fontSize: 11,
    fontFamily: 'Lato Italic',
  },
  detailLeftColumn: {
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
  },
  detailRightColumn: {
    flexDirection: 'column',
    flexGrow: 9,
  },
  bulletPoint: {
    fontSize: 10,
  },
  details: {
    fontSize: 10,
    fontFamily: 'Lato',
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  leftColumn: {
    flexDirection: 'column',
    flexGrow: 9,
  },
  rightColumn: {
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'flex-end',
    justifySelf: 'flex-end',
  },
  title: {
    fontSize: 11,
    color: 'black',
    textDecoration: 'none',
    fontFamily: 'Lato Bold',
  },
})

function ExperienceEntry({ work }: { work: Work }) {
  const title = `${work.company} | ${work.role}`
  return (
    <View style={styles.entryContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.leftColumn}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.date}>
            {work.startDate}
            {' '}
            -
            {' '}
            {work.currentlyWorking ? 'Present' : work.endDate}
          </Text>
        </View>
      </View>
      <List>
        {work.points.map(point => (
          <Item key={point.id}>{point.description}</Item>
        ))}
      </List>
    </View>
  )
}

function Experience() {
  const { works } = useResumeStore()

  return (
    <View style={styles.container}>
      <Title>Experience</Title>
      {works.map(work => (
        <ExperienceEntry key={work.id} work={work} />
      ))}
    </View>
  )
}

export default Experience
