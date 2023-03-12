import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Stack } from '@mui/material'
import { Container } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { useLazyGetAvaiableBikesQuery } from '@/src/store/services/bikeApi'
import BikesGrid from './BikesGrid'
import {
   getBikes,
   getDate,
   getRange,
   getSize,
   getType,
} from '@/src/store/selectors'
import { deleteBike } from '@/src/store/bookingFormSlice'

const getCheckedNewBikes = (newBikes, currentBikes) => {
   //Si aun no hay bicicletas seleccionadas en el store, no se aplican cambios

   if (currentBikes.length === 0) return newBikes
   const checkedNewBikes = newBikes.map((nBike) => {
      console.log('***********', nBike)
      nBike.new = 'jkjajja'
      const { id, size, count } = nBike
      currentBikes.forEach((cBike) => {
         if (id === cBike.id && size === cBike.size) {
            if (count === cBike.quantity) nBike.avaiable = false
            if (count > cBike.quantity) nBike.avaiable = true
            if (count < cBike.quantity) {
               dispatch(deleteBike({ id, size, count }))
               nBike.avaiable = false
            }
         }
      })
      return nBike
   })
   return checkedNewBikes
}

const BikesSelect = () => {
   const isoDate = useSelector(getDate)
   const selectedSize = useSelector(getSize)
   const selectedType = useSelector(getType)
   const selectedRange = useSelector(getRange)
   const currentBikes = useSelector(getBikes)
   const args = {
      ...isoDate,
      size: selectedSize,
      type: selectedType,
      range: selectedRange,
   }

   const [bikes, setBikes] = useState([])

   const [
      trigger,
      { data: avaiableBikes, isFetching, isSuccess },
      lastPromiseInfo,
   ] = useLazyGetAvaiableBikesQuery()

   isSuccess && console.log('bikes', avaiableBikes)
   const handleTrigger = () => trigger(args)

   useEffect(() => {
      !!!selectedRange && setBikes([])
   }, [selectedRange])

   useEffect(() => {
      isSuccess && setBikes(getCheckedNewBikes(avaiableBikes, currentBikes))
   }, [avaiableBikes])

   return (
      <Container>
         <Stack alignItems="center" spacing={2}>
            {selectedRange && (
               <Button
                  //disabled={!!!selectedRange}
                  onClick={handleTrigger}
               >
                  Mostrar bicicletas
               </Button>
            )}
            {isFetching ? (
               <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
               </Box>
            ) : (
               bikes && <BikesGrid bikes={bikes} />
            )}
         </Stack>
      </Container>
   )
}

export default BikesSelect
