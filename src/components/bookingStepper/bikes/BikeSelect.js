import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Stack } from '@mui/material'
import { Container } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { useLazyGetAvaiableBikesQuery } from '@/src/app/apiServices/bikeApi'
import BikesGrid from './BikesGrid'
import {
   bikeRemoved,
   selectBikes,
} from '@/src/app/features/user/booking/bookingProcessSlice'

const BikesSelect = ({ form, dateRange }) => {
   const dispatch = useDispatch()

   const currentBikes = useSelector(selectBikes)
   const { range } = form

   const [bikes, setBikes] = useState([])

   const [
      trigger,
      { data: avaiableBikes, isFetching, isSuccess },
      lastPromiseInfo,
   ] = useLazyGetAvaiableBikesQuery()

   const handleTrigger = () => trigger({ ...dateRange, ...form })

   useEffect(() => {
      !!!range && setBikes([])
   }, [range])

   useEffect(() => {
      isSuccess && setBikes(getCheckedNewBikes(avaiableBikes, currentBikes))
   }, [avaiableBikes])

   const getCheckedNewBikes = (newBikes, currentBikes) => {
      //Si aun no hay bicicletas seleccionadas en el store, no se aplican cambios
      if (currentBikes.length === 0) return newBikes
      const checkedNewBikes = newBikes.map((nBike) => {
         const { id, size, count } = nBike
         let checkedBike = {}
         //Comprueba si el id+size ya se encuentra stored y procede
         currentBikes.forEach((cBike) => {
            if (id === cBike.id && size === cBike.size) {
               if (count === cBike.quantity) {
                  checkedBike = { ...nBike, avaiable: false }
               }
               if (count > cBike.quantity) {
                  checkedBike = { ...nBike, avaiable: true }
               }
               if (count < cBike.quantity) {
                  dispatch(bikeRemoved({ id, size, count }))
                  checkedBike = { ...nBike, avaiable: false }
               }
            } else {
               {
                  //Si el id+size no está stored, asigna la propiedad avaiable:true directamente
                  checkedBike = { ...nBike, avaiable: true }
               }
            }
         })
         return checkedBike
      })
      return checkedNewBikes
   }

   return (
      <Container>
         <Stack alignItems="center" spacing={2}>
            {range && (
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
