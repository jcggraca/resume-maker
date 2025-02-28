import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { useResumeStore } from '../../../store/useResumeStore'
import Title from './Title'

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Lato Bold',
    fontSize: 11,
    marginBottom: 10,
  },
  skills: {
    fontFamily: 'Lato',
    fontSize: 10,
    marginBottom: 10,
  },
})

interface SkillEntryProps {
  name: string
  description: string
}

function SkillEntry({ name, description }: SkillEntryProps) {
  return (
    <View>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.skills}>{description}</Text>
    </View>
  )
}

function Skills() {
  const { skills } = useResumeStore()

  return (
    <View>
      <Title>Skills</Title>

      {skills.map(skill => (
        <SkillEntry
          key={skill.id}
          name={skill.name}
          description={skill.description}
        />
      ))}
    </View>
  )
}

export default Skills
