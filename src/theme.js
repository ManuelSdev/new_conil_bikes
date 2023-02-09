import { Roboto } from '@next/font/google'
import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

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
         main: '#556cd6',
         green: '#E4F39E',
         // main: '#E4F39E',
      },
      secondary: {
         main: '#19857b',
         green: '#93CB51',
      },
      gradient: {
         main: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(228,243,158,1) 26%, rgba(147,203,81,1) 74%)',
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
