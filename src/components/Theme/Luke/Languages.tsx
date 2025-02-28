import { View } from '@react-pdf/renderer'
import { useResumeStore } from '../../../store/useResumeStore'
import List, { Item } from './List'
import Title from './Title'

function Languages() {
  const { languages } = useResumeStore()

  return (
    <View>
      <Title>Languages</Title>

      <List>
        {languages.map(language => (
          <Item key={language.id}>
            {language.name}
            {' '}
            -
            {' '}
            {language.level}
          </Item>
        ))}
      </List>
    </View>
  )
}

export default Languages
