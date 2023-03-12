//import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, Button, Divider } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BookingForm from './BikeForm'
import SelectedBikesList from './SelectedBikesList'
import {
   getAddButton,
   getFormIsActive,
   getNumberOfBikes,
} from '@/src/store/selectors'
import { setAddButton, setFormIsActive } from '@/src/store/bookingFormSlice'

const BikesStep = () => {
   const dispatch = useDispatch()
   const amount = useSelector(getNumberOfBikes)
   const addButton = useSelector(getAddButton)
   const formIsActive = useSelector(getFormIsActive)
   const [bookingForms, setBookingForms] = useState([])
   const handleAddBike = () => dispatch(setFormIsActive(true))

   const handleClick = () => {
      dispatch(setAddButton(false))
   }
   /*
        useEffect(() => {
            console.log('dispatchhhh')
            dispatch(setAnotherForm())
        }, [amount]);
    */
   return (
      <Box>
         {/* <SelectedBikesTable></SelectedBikesTable>*/}
         {!!amount && <SelectedBikesList />}
         {!!amount && <Divider sx={{ mt: 1, mb: 2 }} />}
         {formIsActive ? (
            <BookingForm key={amount} />
         ) : (
            <Box
               //alignItems='center'
               mb={1}
               sx={{ display: 'flex', justifyContent: 'center' }}
            >
               <Button onClick={handleAddBike}>Añadir bicicleta</Button>
            </Box>
         )}
      </Box>
   )
}

export default BikesStep
