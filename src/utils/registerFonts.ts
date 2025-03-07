import { Font } from '@react-pdf/renderer'

export function registerFonts() {
  Font.register({
    family: 'Roboto',
    fonts: [
      { src: '/fonts/Roboto-Regular.ttf' },
      { src: '/fonts/Roboto-Bold.ttf', fontWeight: 'bold' },
      { src: '/fonts/Roboto-Italic.ttf', fontStyle: 'italic' },
    ],
  })
}
