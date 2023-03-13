import { Button, Dialog, DialogContent, CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
   getBookingData,
   getBookingDuration,
   getBookingPrice,
} from '@/src/app/selectors'
import { useAddBookingMutation } from '@/src/app/apiServices/bookingApi'
import Modal from '../elements/Modal'

const ConfirmBookingButton = () => {
   const router = useRouter()
   const bookingData = useSelector(getBookingData)
   const duration = useSelector(getBookingDuration)
   const price = useSelector(getBookingPrice)
   /**
 El array bikes contiene un objeto por cada bici. Cada objeto contiene
 varias propiedades que no es necesario enviar al api para registrar la reserva
 en la base de datos. Solo necesito enviar las propiedades id y size
 */
   const { bikes: toFixBikes } = bookingData

   const bikes = toFixBikes.map((bike) => {
      const { id, size } = bike

      return { id, size }
   })
   //console.log('---------------', bikes)
   const finalBookingData = { ...bookingData, price, duration }
   console.log('************', finalBookingData)
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
      console.log('mmmmmmmmmmmmmmm', finalBookingData)
      await addBooking(finalBookingData).unwrap()
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
