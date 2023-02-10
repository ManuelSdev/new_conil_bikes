import { Box } from '@mui/material'

import { Container } from '@mui/material'
import Head from 'next/head'
//import logo from '@/public/logo.svg'
import Image from 'next/image'
import Logo from '@/public/logo.svg'
const Layout = ({ header, children }) => {
   //const matches = useMediaQuery("(min-width:600px)", { color: 'red', });
   //const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

   //Mayor factor = menos tamaño
   const factor = 1
   const handleViewBox = (factor) => `0 0 ${227 * factor} ${181 * factor}`
   const handleSvgWidth = () => `${227 * factor}px`
   const handleSvgHeight = () => `${181 * factor}px`
   // console.log(matches)
   const minWidth = '400px'
   const Log = () => Image
   return (
      <>
         <Head>
            <title>Conil Bikes Web</title>
            <meta
               name="description"
               content="Web de Conil Bikes: venta, alquiler y reparación de bicicletas"
            />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" type="image/svg" href="/favicon.svg" />
         </Head>
         <header className="w-[100%]">
            <Box
               className="flex grow flex-col justify-center py-4	"
               sx={{
                  // minWidth,
                  // width: '100%',
                  // height: '700px',
                  // https://cssgradient.io/,
                  backgroundColor: 'primary.green',
                  // 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(228,243,158,1) 26%, rgba(147,203,81,1) 74%)',

                  //  width: '227px',
                  //  height: '181px',
               }}
            >
               <Box className="flex justify-center">
                  <Logo
                     className="fill-black "
                     fill="black"
                     //   viewBox={handleViewBox()}
                     width={handleSvgWidth(factor)}
                     height={handleSvgHeight(factor)}
                  />
               </Box>
               {/**
 
 <Box
                  sx={{
                     width: '100%',
                     height: '40px',
                     background: 'black',
                     color: 'white',
                  }}
               >
                  ICONOS
               </Box>

 */}
            </Box>
         </header>
         <main>
            <Box
               sx={{
                  //minWidth
                  background: 'red',
               }}
            >
               <Container
                  sx={{
                     mb: 5,
                     //   px: 9,
                     backgroundColor: 'primary.green',
                     // height: '700px',
                  }}
               >
                  {children}
               </Container>
            </Box>
         </main>
         <footer>
            <Box sx={{ minWidth }}>FOOTER</Box>
         </footer>
      </>
   )
}

export default Layout
