import type { MessageDescriptor } from 'react-intl'
import { useIntl } from 'react-intl'

export function useFormatMessage() {
  const intl = useIntl()
  return (msg: MessageDescriptor) => intl.formatMessage(msg)
}
