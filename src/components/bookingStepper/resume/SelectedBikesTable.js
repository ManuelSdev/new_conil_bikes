import { Grid, Stack, Typography, Box } from '@mui/material'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { BIKE_RANGES_MAP, BIKE_TYPES_MAP } from '@/src/utils/appValues'
import SelectedBikeCard from './SelectedBikeCard'
import { selectBikes } from '@/src/app/features/user/booking/bookingProcessSlice'

const SelectedBikesTable = () => {
   const selectedBikes = useSelector(selectBikes)
   console.log(selectedBikes)

   return (
      <Stack spacing={2} sx={{ padding: 1 }}>
         {selectedBikes.map((bike, index) => {
            const [image] = bike.images
            return <SelectedBikeCard key={index} bike={bike} />
         })}
      </Stack>
   )
}

export default SelectedBikesTable
