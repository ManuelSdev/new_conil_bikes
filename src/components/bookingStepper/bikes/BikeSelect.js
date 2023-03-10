import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Stack } from '@mui/material'
import { Container } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { useLazyGetAvaiableBikesQuery } from '@/src/store/services/bikeApi'
import BikesGrid from './BikesGrid'
import { getDate, getRange, getSize, getType } from '@/src/store/selectors'

const BikesSelect = () => {
   const isoDate = useSelector(getDate)
   const selectedSize = useSelector(getSize)
   const selectedType = useSelector(getType)
   const selectedRange = useSelector(getRange)

   const args = {
      // ...isoDate,
      //size: selectedSize,
      type: selectedType,
      range: selectedRange,
   }

   const [bikes, setBikes] = useState([])

   const [
      trigger,
      { data: avaiableBikes, isFetching, isSuccess },
      lastPromiseInfo,
   ] = useLazyGetAvaiableBikesQuery((a) => console.log('0000000000000000', a))
   console.log('bikes', avaiableBikes)
   const handleTrigger = () => trigger(args)

   useEffect(() => {
      !!!selectedRange && setBikes([])
   }, [selectedRange])

   useEffect(() => {
      isSuccess && setBikes([...avaiableBikes])
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
