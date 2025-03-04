import type { FC } from 'react'
import type { Certification, Education, Language, PersonalInfo, Skill, Work } from '../../../store/useResumeStore'
import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import { useSettingsStore } from '../../../store/useSettingsStore'
import { cleanUrl } from '../../../utils/form'

const font = useSettingsStore.getState().font

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: font,
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
    marginBottom: 5,
  },
  contactItem: {
    marginRight: 5,
  },
  link: {
    color: '#0000EE',
    marginRight: 5,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginTop: 10,
    marginBottom: 5,
  },
  skillsSection: {
    marginBottom: 5,
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
    marginBottom: 5,
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
    marginTop: 5,
  },
  certificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  projectItem: {
    marginBottom: 2,
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

interface MinimalProps {
  personalInfo: PersonalInfo
  certifications: Certification[]
  works: Work[]
  skills: Skill[]
  languages: Language[]
  education: Education[]
}

const Minimal: FC<MinimalProps> = ({ personalInfo, certifications, works, skills, languages, education }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.name}</Text>
          <Text style={styles.contactInfo}>
            {personalInfo.location
              ? <Text style={styles.contactItem}>{personalInfo.location}</Text>
              : <Text style={{ display: 'none' }}>{}</Text>}

            {personalInfo.location && (personalInfo.email || personalInfo.website || personalInfo.github || personalInfo.linkedin) ? ' | ' : ''}

            {personalInfo.email
              ? <Link href={`mailto:${personalInfo.email}`} style={styles.link}>{cleanUrl(personalInfo.email)}</Link>
              : <Link style={{ display: 'none' }} href="#">{}</Link>}

            {personalInfo.email && (personalInfo.github || personalInfo.website || personalInfo.linkedin) ? ' | ' : ''}

            {personalInfo.website
              ? <Link href={personalInfo.website} style={styles.link}>{cleanUrl(personalInfo.website)}</Link>
              : <Link style={{ display: 'none' }} href="#">{}</Link>}

            {personalInfo.website && (personalInfo.github || personalInfo.linkedin) ? ' | ' : ''}

            {personalInfo.github
              ? <Link href={personalInfo.github} style={styles.link}>{cleanUrl(personalInfo.github)}</Link>
              : <Link style={{ display: 'none' }} href="#">{}</Link>}

            {personalInfo.github && personalInfo.linkedin ? ' | ' : ''}

            {personalInfo.linkedin
              ? <Link href={personalInfo.linkedin} style={styles.link}>{cleanUrl(personalInfo.linkedin)}</Link>
              : <Link style={{ display: 'none' }} href="#">{}</Link>}
          </Text>

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
          <Text style={styles.sectionTitle}>Languages</Text>
          {languages.map(language => (
            <View key={language.id} style={styles.certificationItem}>
              <Text>
                {language.name}
                {language.level && ` - ${language.level}`}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.certifications}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map(item => (
            <View key={item.id}>
              <View style={styles.certificationItem}>
                <Text>{item.institution}</Text>
                <Text style={styles.dateRange}>{item.date}</Text>
              </View>
              <Text>{item.degree}</Text>
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
      </Page>
    </Document>
  )
}

export default Minimal
