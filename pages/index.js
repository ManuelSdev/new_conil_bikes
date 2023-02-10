import Layout from '@/src/components/layout/Layout'
import Link from '@/src/lib/Link'
import { Stack } from '@mui/material'
import Photo from '@/public/mbike.webp'
import Shop from '@/public/shop.jpg'
import Repair from '@/public/repair.jpg'

import { HomeSectionCard } from '@/src/components/elements/HomeSectionCard'
export default function Home() {
   //  const p = './booking.jpg'
   return (
      <Layout>
         <Stack
            direction="column"
            spacing={2}
            //  sx={{ backgroundColor: 'primary.main' }}
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
               buttonText={'reservar'}
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
         </Stack>
      </Layout>
   )
}

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
            
            */
