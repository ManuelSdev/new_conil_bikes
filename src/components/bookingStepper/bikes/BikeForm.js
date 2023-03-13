import Stack from '@mui/material/Stack'
import SizeSelect from './SizeSelect'
import TypeSelect from './TypeSelect'
import RangeSelect from './RangeSelect'
//import BikesSelect from "./BikeSelect"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAnotherForm } from '@/src/app/features/user/booking/bookingProcessSlice'
import BikesSelect from './BikeSelect'
import { getRange } from '@/src/app/selectors'

const BikeForm = () => {
   const dispatch = useDispatch()
   const r = useSelector(getRange)
   //MIRA: suprimo mientras refino redux
   /*
   useEffect(() => {
      //  console.log("++++++++++++++Component mounted.");
      return () =>
         //console.log("------------Component unmounted.") ||
         dispatch(setAnotherForm())
   }, [])
   */
   return (
      <Stack spacing={2}>
         <SizeSelect />
         <TypeSelect />
         <RangeSelect />
         <BikesSelect />
      </Stack>
   )
}

export default BikeForm
