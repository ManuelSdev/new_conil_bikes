import { Button, Dialog, DialogContent, CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import { useAddBookingMutation } from '@/src/app/apiServices/bookingApi'
import Modal from '../elements/Modal'
import { selectBookingData } from '@/src/app/features/user/booking/bookingProcessSlice'

const ConfirmBookingButton = () => {
   const router = useRouter()
   const bookingData = useSelector(selectBookingData)

   const [
      addBooking,
      {
         status,
         isUninitialized,
         isLoading,
         isSuccess,
         data: dato,
         isError,
         reset,
      },
   ] = useAddBookingMutation({ fixedCacheKey: 'addBooking-key' })

   const [open, setOpen] = useState(false)

   const handleOpen = () => {
      setOpen(true)
   }

   const handleClose = () => {
      setOpen(false)
      isSuccess && router.push('/')
   }

   const handleSubmit = async () => {
      console.log('mmmmmmmmmmmmmmm', bookingData)
      await addBooking(bookingData).unwrap()
      handleOpen()
   }
   return (
      <>
         <Modal
            handleClose={handleClose}
            open={open}
            title={
               isSuccess
                  ? 'Hemos registrado tu reserva correctamente'
                  : 'Hubo un error al procesar tu reserva. Vuelve a intentarlo'
            }
         >
            <Button onClick={handleClose} autoFocus>
               Aceptar
            </Button>
         </Modal>
         <Dialog open={isLoading}>
            <DialogContent sx={{ width: '100%' }}>
               <CircularProgress />
            </DialogContent>
         </Dialog>

         <Button fullWidth onClick={handleSubmit} sx={{ mb: 2 }}>
            Confirmar reserva
         </Button>
      </>
   )
}

export default ConfirmBookingButton
