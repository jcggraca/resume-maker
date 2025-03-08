import { Font } from '@react-pdf/renderer'

export function registerFonts() {
  Font.register({
    family: 'Roboto',
    fonts: [
      { src: '/fonts/Roboto/Roboto-Regular.ttf' },
      { src: '/fonts/Roboto/Roboto-Bold.ttf', fontWeight: 'bold' },
      { src: '/fonts/Roboto/Roboto-Italic.ttf', fontStyle: 'italic' },
    ],
  })

  Font.register({
    family: 'Inter',
    fonts: [
      { src: '/fonts/Inter/Inter-Regular.ttf' },
      { src: '/fonts/Inter/Inter-Bold.ttf', fontWeight: 'bold' },
      { src: '/fonts/Inter/Inter-Italic.ttf', fontStyle: 'italic' },
    ],
  })

  Font.register({
    family: 'PT Serif',
    fonts: [
      { src: '/fonts/PT_Serif/PT_Serif-Regular.ttf' },
      { src: '/fonts/PT_Serif/PT_Serif-Bold.ttf', fontWeight: 'bold' },
      { src: '/fonts/PT_Serif/PT_Serif-Italic.ttf', fontStyle: 'italic' },
    ],
  })

  Font.register({
    family: 'Arimo',
    fonts: [
      { src: '/fonts/Arimo/Arimo-Regular.ttf' },
      { src: '/fonts/Arimo/Arimo-Bold.ttf', fontWeight: 'bold' },
      { src: '/fonts/Arimo/Arimo-Italic.ttf', fontStyle: 'italic' },
    ],
  })
}
