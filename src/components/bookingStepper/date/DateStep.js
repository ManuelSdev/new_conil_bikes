import { Box, Button } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import Modal from "@/src/components/elements/Modal";
import DateSelect from './DateSelect'
import {
   bikeFormEnabled,
   dateModified,
   selectBikes,
   selectDateRange,
} from '@/src/app/features/user/booking/bookingProcessSlice'

import Modal from '../../elements/Modal'

//import Modal from "../../elements/Modal";

//TODO: limpia
const DateStep = () => {
   const dispatch = useDispatch()

   const bikes = useSelector(selectBikes)
   const { from, to } = useSelector(selectDateRange)
   //YA: LISTENER
   //TODO: check el formato de la fecha, si necesita objeto de config con format:true
   const dateIsBlockedByBikes = from && to && !!bikes.length
   console.log('fecha bloqueada', dateIsBlockedByBikes)
   console.log('hay bicis', !!bikes.length)
   const handleAddBike = () => dispatch(bikeFormEnabled)

   const handleClick = () => {
      dispatch()
   }
   const [open, setOpen] = useState(false)

   const handleOpen = () => {
      setOpen(true)
   }

   const handleCancel = () => {
      console.log('close')
      setOpen(false)
   }
   const handleAccept = () => {
      console.log('aceptar')
      dispatch(dateModified())
      setOpen(false)
   }

   /*
        useEffect(() => {
            console.log('dispatchhhh')
            dispatch(setAnotherForm())
        }, [amount]);
    */
   return (
      <Box
         sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
         <Modal
            handleClose={handleCancel}
            open={open}
            title="Atención:"
            content="Si modifica la fecha, las bicicletas seleccionadas serán eliminadas para que pueda buscar entre las bicicletas disponibles en la nueva fecha introducida"
         >
            <Box
               sx={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  flex: '1 0 0',
               }}
            >
               <Button onClick={handleCancel}>Cancelar</Button>
               <Button onClick={handleAccept} autoFocus>
                  Aceptar
               </Button>
            </Box>
         </Modal>
         <DateSelect />
         {dateIsBlockedByBikes && (
            <Button onClick={handleOpen} sx={{ mt: 2, mb: 2, width: '50%' }}>
               Modificar fecha
            </Button>
         )}
      </Box>
   )
}

export default DateStep
