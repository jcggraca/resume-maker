import type { ReactNode } from 'react'

import { StyleSheet, Text } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Lato Bold',
    fontSize: 14,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
})

const Title = ({ children }: { children: ReactNode }) => <Text style={styles.title}>{children}</Text>

export default Title
