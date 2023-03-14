import { selectDatabaseInfoSegmentList } from '@/src/app/databaseInfoSlice'
import { BIKE_RANGES_MAP, BIKE_TYPES_MAP } from '@/src/utils/appValues'
import { Box, Paper, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'

const SelectedBikeCard = ({ bike }) => {
   const [image] = bike.images

   const segmentList = useSelector(selectDatabaseInfoSegmentList)

   const getBikeSegment = () =>
      segmentList.filter(
         (segment) => segment.type === bike.type && segment.range === bike.range
      )
   const [{ price }] = getBikeSegment()
   console.log(price)
   return (
      <Paper
         sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
            width: '100%',
            overflow: 'hidden',
         }}
      >
         <Image
            src={image}
            alt="Vercel Logo"
            //className={styles.vercelLogo}
            width="300"
            height="200"
            //TODO: mira bien esto de priority
            //priority
            style={{ width: '100%', height: '50%' }}
         />
         <Stack mr={4} sx={{ width: '100%', padding: 2 }}>
            <Typography component="div" variant="h6">
               {bike.brand} {bike.model}
            </Typography>

            <Typography
               //key={engType}
               component="div"
               color="text.secondary"
               variant="body2"
            >
               Tipo: {BIKE_TYPES_MAP[bike.type]}
            </Typography>
            <Typography
               // key={engRange}
               component="div"
               variant="body2"
               color="text.secondary"
            >
               Gama: {BIKE_RANGES_MAP[bike.range]}
            </Typography>

            <Typography variant="body2" color="text.secondary" component="div">
               Talla: {bike.size}
            </Typography>
            <Typography
               variant="h6"
               color="text.secondary"
               component="div"
               sx={{ alignSelf: 'flex-end' }}
            >
               {price} €/día
            </Typography>
         </Stack>
      </Paper>
   )
}

export default SelectedBikeCard
