import Stack from '@mui/material/Stack'
import SizeSelect from './SizeSelect'
import TypeSelect from './TypeSelect'
import RangeSelect from './RangeSelect'
//import BikesSelect from "./BikeSelect"
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAnotherForm } from '@/src/app/features/user/booking/bookingProcessSlice'
import BikesSelect from './BikeSelect'

const BikeFilterForm = () => {
   const dispatch = useDispatch()

   useEffect(() => {
      //  console.log("++++++++++++++Component mounted.");
      return () =>
         //console.log("------------Component unmounted.") ||
         dispatch(setAnotherForm())
   }, [])
   return (
      <Stack spacing={2}>
         <SizeSelect />
         <TypeSelect />
         <RangeSelect />
         <BikesSelect />
      </Stack>
   )
}

export default BikeFilterForm
