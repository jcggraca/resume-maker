import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  View,
} from '@react-pdf/renderer'

import { useResumeStore } from '../../../store/useResumeStore'
import Education from './Education'
import Experience from './Experience'
import Header from './Header'
import Languages from './Languages'
import Skills from './Skills'
import Summary from './Summary'
import Personal from './Personal'

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    marginBottom: 10,
  },
  leftColumn: {
    flexDirection: 'column',
    width: 170,
    paddingTop: 30,
    paddingRight: 15,
  },
  rightColumn: {
    flexDirection: 'column',
    flex: 1,
    overflow: 'hidden',
  },
})

Font.register({
  family: 'Open Sans',
  src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
})

Font.register({
  family: 'Lato',
  src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
})

Font.register({
  family: 'Lato Italic',
  src: `https://fonts.gstatic.com/s/lato/v16/S6u8w4BMUTPHjxsAXC-v.ttf`,
})

Font.register({
  family: 'Lato Bold',
  src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`,
})

const IMAGE_SRC
  = 'https://i.guim.co.uk/img/media/a23aeb1f7ff20bb80f68852da17743b0e557f8ed/0_224_3504_2102/master/3504.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=9e9a99e479ee60270b69ede4d869b20f'

function Luke() {
  const { personalInfo } = useResumeStore()

  return (
    <Document
      author={personalInfo.name}
      keywords="cv, resume"
      title="Resume"
    >
      <Page size="A4" style={styles.page}>
        <Header />
        <View style={styles.container}>
          <View style={styles.leftColumn}>
            <Image src={IMAGE_SRC} style={styles.image} />
            <Personal />
            <Skills />
            <Languages />
          </View>

          <View style={styles.rightColumn}>
            <Summary />
            <Experience />
            <Education />
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default Luke
