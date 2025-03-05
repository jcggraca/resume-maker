import type { FC } from 'react'
import type { Certification, Education, Language, PersonalInfo, Skill, Work } from '../../../store/useResumeStore'
import { Document, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { useSettingsStore } from '../../../store/useSettingsStore'
import { cleanUrl } from '../../../utils/form'
import List, { Item } from './List'

const font = useSettingsStore.getState().font

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: font,
    fontSize: 11,
  },
  header: {
    marginBottom: 10,
    textAlign: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
  },
  contact: {
    fontSize: 10,
    marginBottom: 5,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
  },
  item: {
    marginBottom: 5,
  },
  itemCertification: {
    flexDirection: 'row',
    width: 470,
  },
  itemSkill: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 5,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 10,
  },
  location: {
    fontSize: 10,
  },
  skills: {
    fontSize: 10,
    maxWidth: 470,
  },
})

interface StandardProps {
  personalInfo: PersonalInfo
  certifications: Certification[]
  works: Work[]
  skills: Skill[]
  languages: Language[]
  education: Education[]
}

const Standard: FC<StandardProps> = ({ personalInfo, certifications, works, skills, languages, education }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.name}</Text>
          <Text style={styles.title}>{personalInfo.jobTitle}</Text>
          <Text style={styles.contact}>
            {personalInfo.email && <Link href={`mailto:${personalInfo.email}`}>{personalInfo.email}</Link>}
            {personalInfo.email && (personalInfo.website || personalInfo.github || personalInfo.linkedin) ? ' | ' : ''}

            {personalInfo.website && <Link href={personalInfo.website || '#'}>{cleanUrl(personalInfo.website || '')}</Link>}
            {personalInfo.website && (personalInfo.github || personalInfo.linkedin) ? ' | ' : ''}

            {personalInfo.github && <Link href={personalInfo.github}>{cleanUrl(personalInfo.github)}</Link>}
            {personalInfo.github && personalInfo.linkedin ? ' | ' : ''}

            {personalInfo.linkedin && <Link href={personalInfo.linkedin}>{cleanUrl(personalInfo.linkedin)}</Link>}
          </Text>
          <Text style={styles.contact}>
            {personalInfo.phone && <Text>{personalInfo.phone}</Text>}

            {personalInfo.phone && personalInfo.location ? ' | ' : ''}

            {personalInfo.location && <Text>{personalInfo.location}</Text>}
          </Text>
        </View>

        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SUMMARY</Text>
            <Text>{personalInfo.summary}</Text>
          </View>
        )}

        {works.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
            {works.map(experience => (
              <View key={experience.id} style={styles.item}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{experience.company}</Text>
                  <Text style={styles.date}>
                    {experience.startDate}
                    {' '}
                    -
                    {' '}
                    {experience.currentlyWorking ? 'Present' : experience.endDate}
                  </Text>
                </View>
                <View style={styles.itemHeader}>
                  <Text style={{ marginBottom: 5 }}>{experience.role}</Text>
                  <Text style={styles.location}>{experience.location}</Text>
                </View>

                <List>
                  {experience.points.map(point => (
                    <Item key={point.id}>{point.description}</Item>
                  ))}
                </List>
              </View>
            ))}
          </View>
        )}

        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SKILLS</Text>

            {skills.map(skill => (
              <View style={styles.itemSkill} key={skill.id}>
                <Text style={{ fontWeight: 'bold' }}>
                  {skill.name}
                  :
                </Text>
                <Text style={styles.skills}>{skill.description}</Text>
              </View>
            ))}
          </View>
        )}

        {languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>LANGUAGES</Text>

            {languages.map(language => (
              <View key={language.id}>
                <Text>
                  {language.name}
                  {language.level && ` - ${language.level}`}
                </Text>
              </View>
            ))}
          </View>
        )}

        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>

            {education.map(item => (
              <View key={item.id} style={styles.item}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{item.institution}</Text>
                  <Text style={styles.date}>{item.date}</Text>
                </View>

                <Text>{item.degree}</Text>
              </View>
            ))}
          </View>
        )}

        {certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>

            {certifications.map(item => (
              <View key={item.id} style={styles.itemHeader}>
                <View style={styles.itemCertification}>
                  <Text style={{ fontWeight: 'bold' }}>
                    {item.name}
                  </Text>
                  {item.description && (
                    <Text>
                      ,
                      {' '}
                      {item.description}
                    </Text>
                  )}
                </View>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  )
}

export default Standard
