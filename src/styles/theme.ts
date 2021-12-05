import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    black: '#1E2022',
    purple: {
      '400': '#605C85',
      '500': '#302E53',
      '700': '#171739',
    },
    orange: {
      '400': '#E37F29',
      '500': '#D07017',
      '600': '#AD5300'
    }
  },
  fonts: {
    body: 'Roboto Condensed',
  }
})