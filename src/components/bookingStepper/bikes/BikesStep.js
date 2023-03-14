//import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, Button, Divider } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import BikeForm from './BikeForm'
import SelectedBikesList from './SelectedBikesList'

import {
   bikeFormEnabled,
   selectBikeFormIsEnable,
   selectNumberOfBikes,
} from '@/src/app/features/user/booking/bookingProcessSlice'

const BikesStep = () => {
   const dispatch = useDispatch()
   const amount = useSelector(selectNumberOfBikes)
   const formIsEnable = useSelector(selectBikeFormIsEnable)
   const handleClick = () => dispatch(bikeFormEnabled)

   return (
      <Box>
         {/* <SelectedBikesTable></SelectedBikesTable>*/}
         {!!amount && <SelectedBikesList />}
         {!!amount && <Divider sx={{ mt: 1, mb: 2 }} />}
         {formIsEnable ? (
            <BikeForm key={amount} />
         ) : (
            <Box
               //alignItems='center'
               mb={1}
               sx={{ display: 'flex', justifyContent: 'center' }}
            >
               <Button onClick={handleClick}>Añadir bicicleta</Button>
            </Box>
         )}
      </Box>
   )
}

export default BikesStep
