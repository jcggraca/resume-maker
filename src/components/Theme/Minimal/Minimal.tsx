import type { FC } from 'react'
import type { Certification, Education, Language, PersonalInfo, Skill, Work } from '../../../store/useResumeStore'
import type { Translations } from '../../../utils/types'
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
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 12,
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
    textTransform: 'capitalize',
    fontSize: 12,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginTop: 10,
    marginBottom: 5,
  },
  skillCategory: {
    fontWeight: 'bold',
    marginRight: 2,
  },
  languageCategory: {
    fontWeight: 'bold',
    marginRight: 2,
  },
  skillsRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  languageRow: {
    flexDirection: 'row',
  },
  experienceItem: {
    marginBottom: 5,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  role: {
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
  skills: {
    fontSize: 10,
    maxWidth: 470,
  },
})

interface MinimalProps {
  personalInfo: PersonalInfo
  certifications: Certification[]
  works: Work[]
  skills: Skill[]
  languages: Language[]
  education: Education[]
  translations: Translations
}

const Minimal: FC<MinimalProps> = ({ personalInfo, certifications, works, skills, languages, education, translations }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.name}</Text>
          <Text style={styles.jobTitle}>{personalInfo.jobTitle}</Text>
          <Text style={styles.contactInfo}>
            {personalInfo.location && <Text style={styles.contactItem}>{personalInfo.location}</Text>}
            {personalInfo.location && (personalInfo.email || personalInfo.website || personalInfo.github || personalInfo.linkedin) ? ' | ' : ''}

            {personalInfo.email && <Link href={`mailto:${personalInfo.email}`} style={styles.link}>{cleanUrl(personalInfo.email)}</Link>}
            {personalInfo.email && (personalInfo.github || personalInfo.website || personalInfo.linkedin) ? ' | ' : ''}

            {personalInfo.website && <Link href={personalInfo.website} style={styles.link}>{cleanUrl(personalInfo.website)}</Link>}
            {personalInfo.website && (personalInfo.github || personalInfo.linkedin) ? ' | ' : ''}

            {personalInfo.github && <Link href={personalInfo.github} style={styles.link}>{cleanUrl(personalInfo.github)}</Link>}
            {personalInfo.github && personalInfo.linkedin ? ' | ' : ''}

            {personalInfo.linkedin && <Link href={personalInfo.linkedin} style={styles.link}>{cleanUrl(personalInfo.linkedin)}</Link>}
          </Text>

          <Text>{personalInfo.summary}</Text>
        </View>

        <View>
          <Text style={styles.sectionTitle}>{translations.experience}</Text>
          {works.map(work => (
            <View key={work.id} style={styles.experienceItem}>
              <View style={styles.experienceHeader}>
                <Text style={styles.role}>
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
                  {work.currentlyWorking ? translations.present : work.endDate}
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

        <View>
          <Text style={styles.sectionTitle}>{translations.skills}</Text>
          {skills.map(skill => (
            <View key={skill.id} style={styles.skillsRow}>
              {skill.name && (
                <Text style={styles.skillCategory}>
                  {skill.name}
                  :
                </Text>
              )}
              <Text style={styles.skills}>{skill.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.certifications}>
          <Text style={styles.sectionTitle}>{translations.languages}</Text>
          {languages.map(language => (
            <View key={language.id} style={styles.languageRow}>
              <Text style={styles.languageCategory}>{language.name}</Text>
              <Text style={styles.skills}>{language.level && `- ${language.level}`}</Text>
            </View>
          ))}
        </View>

        <View style={styles.certifications}>
          <Text style={styles.sectionTitle}>{translations.education}</Text>
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
          <Text style={styles.sectionTitle}>{translations.certifications}</Text>
          {certifications.map(certification => (
            <View key={certification.id} style={styles.certificationItem}>
              <Text>
                {certification.name}
                {certification.description && `, ${certification.description}`}
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
