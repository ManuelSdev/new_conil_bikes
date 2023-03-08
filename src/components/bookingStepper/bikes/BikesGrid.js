import T from 'prop-types'
import { Stack } from '@mui/material'
import BikeCard from './BikeCard'

//TODO: unifica con bikeCard si no lo usas como plantilla
const BikesGrid = ({ bikes, ...props }) => {
   //bikes && console.log(bikes.lenght)
   return (
      <Stack alignItems="center" spacing={2}>
         {bikes.map((bike, index) => (
            <BikeCard key={index} bike={bike}></BikeCard>
         ))}
      </Stack>
   )
}

export default BikesGrid

BikesGrid.propTypes = {
   bikes: T.array,
}
