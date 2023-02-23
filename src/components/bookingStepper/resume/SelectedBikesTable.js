import { Grid, Stack, Typography, Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { getBikes } from '@/src/store/selectors'
import Image from 'next/image'
import { BIKE_RANGES_MAP, BIKE_TYPES_MAP } from '@/src/utils/appValues'

const SelectedBikesTable = () => {
   const selectedBikes = useSelector(getBikes)
   return (
      <Box spacing={1}>
         {selectedBikes.map((bike, index) => {
            const [image] = bike.images
            return <div key={index}>ddd</div>
         })}
      </Box>
   )
}

export default SelectedBikesTable
