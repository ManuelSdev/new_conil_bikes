import { Roboto } from '@next/font/google'
import { createTheme } from '@mui/material/styles'
import { red, black } from '@mui/material/colors'

export const roboto = Roboto({
   weight: ['300', '400', '500', '700'],
   subsets: ['latin'],
   display: 'swap',
   fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

// Create a theme instance.
const theme = createTheme({
   palette: {
      primary: {
         // main: '#556cd6',
         main: '#D5FF40',
         green: '#E4F39E',
         green: '#D5FF40',
         // main: '#E4F39E',
      },
      secondary: {
         // main: '#19857b',
         main: '#000000',
         contrastText: '#D5FF40',
      },
      gradient: {
         main: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(228,243,158,1) 26%, rgba(147,203,81,1) 74%)',
      },
      green: {
         main: '#D5FF40',
      },
      error: {
         main: red.A400,
      },
   },
   typography: {
      fontFamily: roboto.style.fontFamily,
   },

   //Adapta el espacio de mui al de tailwind
   // spacing: (factor) => `${0.25 * factor}rem`,
})

export default theme
