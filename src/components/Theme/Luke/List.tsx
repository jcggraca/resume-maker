import type { ReactNode } from 'react'

import { StyleSheet, Text, View } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
  },
  itemContent: {
    flex: 1,
    fontSize: 10,
    fontFamily: 'Lato',
  },
})

const List = ({ children }: { children: ReactNode }) => children

export function Item({ children }: { children: ReactNode }) {
  return (
    <View style={styles.item}>
      <Text style={styles.bulletPoint}>•</Text>
      <Text style={styles.itemContent}>{children}</Text>
    </View>
  )
}

export default List
