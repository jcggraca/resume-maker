import { format } from 'date-fns'

export function handleDateChange(rawDate: string): string {
  return format(new Date(`${rawDate}`), 'MMM yyyy')
}

export function cleanUrl(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '')
}
