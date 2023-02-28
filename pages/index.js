import Layout from '@/src/components/layout/Layout'
import Link from '@/src/lib/Link'
import { Stack } from '@mui/material'
import Photo from '@/public/mbike.webp'
import Shop from '@/public/shop.jpg'
import Repair from '@/public/repair.jpg'
import Logo from '@/public/logo.svg'
import { HomeSectionCard } from '@/src/components/elements/HomeSectionCard'
import { Box } from '@mui/system'
import { dale } from '@/src/lib/initDatabase'

const a = <Logo fill={'red'} />
export default function Home() {
   //  const p = './booking.jpg'
   // console.log(logo)

   console.log(a)
   return (
      <Layout>
         <Stack
            //     component="div"

            direction="column"
            spacing={2}
            sx={{
               // pt: 17,
               height: 5000,
               width: '100%',
               // backgroundColor: 'red',
               //   position: 'relative',
            }}
         >
            <Box
               sx={{
                  position: 'fixed',
                  width: '100%',
                  display: 'flex',
                  left: 0,
                  justifyContent: 'center',
               }}
            >
               <Logo
                  fill={'white'}
                  style={{
                     //  position: 'fixed',
                     width: '80%',
                  }}
               ></Logo>
            </Box>

            <Logo style={{ visibility: 'hidden', width: '80%' }}></Logo>
            <Stack
               //     component="div"

               direction="column"
               spacing={2}
               sx={{
                  // pt: 17,
                  // pt: 10,
                  //height: 5000,
                  width: '100%',
                  backgroundColor: 'dark.a',
                  position: 'relative',
               }}
            >
               <HomeSectionCard
                  src={Photo.src}
                  title={
                     <span>
                        ALQUILER DE <br /> BICICLETAS
                     </span>
                  }
                  text="  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            condimentum vitae ipsum eget tempus. Phasellus interdum id
            massa non bibendum. Curabitur auctor cursus dignissim."
                  alt="hola"
                  buttonText={'reservar online'}
                  href={'/bookings'}
               >
                  ALQUILER DE <br /> BICICLETAS
               </HomeSectionCard>
               <HomeSectionCard
                  src={Shop.src}
                  text="  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            condimentum vitae ipsum eget tempus. Phasellus interdum id
            massa non bibendum. Curabitur auctor cursus dignissim."
                  alt="hola"
                  buttonText={'contactar'}
                  href={'/'}
               >
                  VENTA DE
                  <br />
                  BICICLETAS Y<br /> ACCESORIOS
               </HomeSectionCard>
               <HomeSectionCard
                  src={Repair.src}
                  text="  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            condimentum vitae ipsum eget tempus. Phasellus interdum id
            massa non bibendum. Curabitur auctor cursus dignissim."
                  alt="hola"
                  buttonText={'contactar'}
                  href={'/'}
               >
                  REPARACION Y
                  <br />
                  MANTENIMIENTO
               </HomeSectionCard>
            </Stack>
         </Stack>
      </Layout>
   )
}

/*
  <HomeSectionCard
               src={Photo.src}
               title={
                  <span>
                     ALQUILER DE <br /> BICICLETAS
                  </span>
               }
               text="  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            condimentum vitae ipsum eget tempus. Phasellus interdum id
            massa non bibendum. Curabitur auctor cursus dignissim."
               alt="hola"
               buttonText={'reservar online'}
            >
               ALQUILER DE <br /> BICICLETAS
            </HomeSectionCard>
            <HomeSectionCard
               src={Shop.src}
               text="  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            condimentum vitae ipsum eget tempus. Phasellus interdum id
            massa non bibendum. Curabitur auctor cursus dignissim."
               alt="hola"
               buttonText={'contactar'}
            >
               VENTA DE
               <br />
               BICICLETAS Y<br /> ACCESORIOS
            </HomeSectionCard>
            <HomeSectionCard
               src={Repair.src}
               text="  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            condimentum vitae ipsum eget tempus. Phasellus interdum id
            massa non bibendum. Curabitur auctor cursus dignissim."
               alt="hola"
               buttonText={'contactar'}
            >
               REPARACION Y
               <br />
               MANTENIMIENTO
            </HomeSectionCard>
*/
/*
  <Image
            src={photo}
            alt="Imagen de producto"
            style={{
               backgroundColor: '#F1F1F1',
               objectFit: 'contain',
            }}
         />
         */

/* 

            <Paper
               elevation={1}
               //      variant="outlined"
               className="relative flex
             w-full flex-col items-center justify-start overflow-hidden rounded-[50px] bg-transparent pb-4 "
            >
               <Box
                  //className="relative flex h-screen  justify-items-start overflow-hidden rounded-t-[50px]"
                  //  sx={{ height: '100px' }}
                  className="relative h-[200px] w-auto overflow-hidden"
               >
                  <Image
                     alt="Picture of the author"
                     className="  z-0 h-[200px] w-full"
                     src={
                        //'https://trek.scene7.com/is/image/TrekBicycleProducts/b300_mtbMarqueeImage?$responsive-pjpg$&cache=on,on&wid=1920'
                        Photo.src
                     }
                     width="300"
                     height="200"
                     // fill
                     style={
                        {
                           //height: 'auto',
                           //  width: '100%',
                        }
                     }
                  />
                  <Typography className="absolute bottom-2 left-2 z-30 w-fit  border-solid border-white p-3 text-white">
                     ALQUILER DE <br /> BICICLETAS
                  </Typography>
               </Box>

               <Typography className="p-4 text-justify	 text-black">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  condimentum vitae ipsum eget tempus. Phasellus interdum id
                  massa non bibendum. Curabitur auctor cursus dignissim.
               </Typography>
               <Divider sx={{ pb: 2 }} />

               <Button
                  sx={{ borderRadius: '50px' }}
                  variant="contained"
                  color="secondary"
                  //className="justify-self-center	"
               >
                  reserva online
               </Button>
            </Paper>
            










            <Stack
            //     component="div"
            direction="column"
            spacing={2}
            sx={{
               pt: 17,
               height: 5000,
               width: '100%',

               //     backgroundImage: `url(${Repair.src})`,

               //  maskImage: 'url(/logo.svg)',
               // maskRepeat: 'no-repeat',
               // maskMode: 'unset',
               //     maskco
               backgroundColor: 'red',
               backgroundImage: 'url(/logo.svg)',
               backgroundSize: 'contain',
               backgroundRepeat: 'no-repeat',
               backgroundAttachment: 'scroll',
               backgroundPosition: 'top',
               //  backdropFilter: 'red',
               // backgroundColor: 'blue',
               //    background: 'red',
            }}
         >
            */
