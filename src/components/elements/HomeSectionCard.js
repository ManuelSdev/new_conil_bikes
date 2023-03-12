import Link from '@/src/lib/Link'
import { Box, Button, Divider, Paper, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export const HomeSectionCard = ({
   title,
   alt,
   src,
   text,
   children,
   buttonText,
   href,
}) => {
   return (
      <Paper
         sx={{
            backgroundColor: 'dark.c',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
            overflow: 'hidden',
            borderRadius: '50px',
            paddingBottom: 4,
         }}
         elevation={1}
         //      variant="outlined"
         className="relative flex
  w-full flex-col items-center justify-start overflow-hidden rounded-[50px]  pb-4 "
      >
         <Box
            //className="relative flex h-screen  justify-items-start overflow-hidden rounded-t-[50px]"
            sx={{
               height: '200px',
               position: 'relative',
               width: '100%',
               overflow: 'hidden',
            }}
            //CLAVE: Controla width aquí
            className="relative h-[200px] w-full overflow-hidden"
         >
            <Image
               alt={alt}
               className="  z-0 h-[250px] w-full"
               src={src}
               width="300"
               height="200"
               style={{
                  zIndex: 0,
                  height: '250px',
                  width: '100%',
               }}
               // fill
            />
            <Typography
               sx={{
                  position: 'absolute',
                  bottom: 10,
                  left: 10,
                  zIndex: 30,
                  width: 'fit-content',
                  borderStyle: 'solid',
                  borderColor: 'white',
                  bgcolor: 'rgba(0, 0, 0, 0.4)',
                  padding: 1,
                  color: 'white',
               }}
               className="absolute bottom-2  left-2 z-30 w-fit border-solid border-white bg-black/[0.4] p-3 text-white "
            >
               {children}
            </Typography>
         </Box>

         <Typography
            sx={{
               padding: 2,
               textAlign: 'justify',
               color: '#BCBCBC',
            }}
            className="p-4 text-justify text-[#BCBCBC]"
         >
            {text}
         </Typography>
         <Divider sx={{ pb: 2 }} />
         <Link href={href} passHref>
            <Button
               sx={{ borderRadius: '50px' }}
               variant="contained"
               color="secondary"
               //className="justify-self-center	"
            >
               {buttonText}
            </Button>
         </Link>
      </Paper>
   )
}
