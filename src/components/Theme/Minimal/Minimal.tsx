import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import { useResumeStore } from '../../../store/useResumeStore'
import { cleanUrl } from '../../../utils/form'

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
  },
  header: {
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactInfo: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
    marginBottom: 10,
  },
  contactItem: {
    marginRight: 10,
  },
  link: {
    color: '#0000EE',
    textDecoration: 'none',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  skillsSection: {
    marginBottom: 10,
  },
  skillCategory: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  skillsRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  experienceItem: {
    marginBottom: 10,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  jobTitle: {
    fontWeight: 'bold',
  },
  dateRange: {
    fontStyle: 'italic',
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bullet: {
    width: 10,
    textAlign: 'center',
  },
  bulletText: {
    flex: 1,
  },
  certifications: {
    marginTop: 10,
  },
  certificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  projectItem: {
    marginBottom: 10,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  projectName: {
    fontWeight: 'bold',
  },
  projectLink: {
    color: '#0000EE',
  },
})

function ResumePDF() {
  const { personalInfo, skills, works, certifications } = useResumeStore()

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.name}</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactItem}>{personalInfo.jobTitle}</Text>
            <Text style={styles.contactItem}>|</Text>
            <Link href={`mailto:${personalInfo.linkedin}`} style={styles.link}>{cleanUrl(personalInfo.email)}</Link>
            <Text style={styles.contactItem}>|</Text>
            <Link href={personalInfo.website} style={styles.link}>{cleanUrl(personalInfo.website)}</Link>
            <Text style={styles.contactItem}>|</Text>
            <Link href={personalInfo.github} style={styles.link}>{cleanUrl(personalInfo.github)}</Link>
            <Text style={styles.contactItem}>|</Text>
            <Link href={personalInfo.linkedin} style={styles.link}>{cleanUrl(personalInfo.linkedin)}</Link>
          </View>
          <Text>{personalInfo.summary}</Text>
        </View>

        <View style={styles.skillsSection}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {skills.map(skill => (
            <View key={skill.id} style={styles.skillsRow}>
              {skill.name && (
                <Text style={styles.skillCategory}>
                  {skill.name}
                  :
                </Text>
              )}
              <Text>{skill.description}</Text>
            </View>
          ))}
        </View>

        <View>
          <Text style={styles.sectionTitle}>Experience</Text>
          {works.map(work => (
            <View key={work.id} style={styles.experienceItem}>
              <View style={styles.experienceHeader}>
                <Text style={styles.jobTitle}>
                  {work.company}
                  ,
                  {' '}
                  {work.role}
                </Text>
                <Text style={styles.dateRange}>
                  {work.startDate}
                  {' '}
                  –
                  {' '}
                  {work.currentlyWorking ? 'Present' : work.endDate}
                </Text>
              </View>
              {work.points.map(point => (
                <View key={point.id} style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{point.description}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.certifications}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          {certifications.map(certification => (
            <View key={certification.id} style={styles.certificationItem}>
              <Text>
                {certification.name}
                ,
                {' '}
                {certification.description}
              </Text>
              <Text style={styles.dateRange}>{certification.date}</Text>
            </View>
          ))}

        </View>

        {/* Projects */}
        <View style={styles.certifications}>
          <Text style={styles.sectionTitle}>Projects</Text>

          {/* Project 1 */}
          <View style={styles.projectItem}>
            <View style={styles.projectHeader}>
              <Text style={styles.projectName}>Nvim-docker</Text>
              <Link src="https://github.com/dgrbrady/nvim-docker" style={styles.projectLink}>github.com/dgrbrady/nvim-docker</Link>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>Neovim plugin for Docker image and container management, written in Lua, 100+ stars on GitHub</Text>
            </View>
          </View>

          {/* Project 2 */}
          <View style={styles.projectItem}>
            <View style={styles.projectHeader}>
              <Text style={styles.projectName}>Crossroads</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>A cutting-edge, local-first, real-time collaborative platform using SvelteKit. Features an extensible plugin system, interactive map rendering, customizable avatars, offline support and seamless data synchronization across WebSocket, IndexedDB, and PocketBase infrastructure</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default ResumePDF
