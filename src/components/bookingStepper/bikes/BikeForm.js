import Stack from '@mui/material/Stack'
import SizeSelect from './SizeSelect'
import TypeSelect from './TypeSelect'
import RangeSelect from './RangeSelect'
//import BikesSelect from "./BikeSelect"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAnotherForm } from '@/src/store/bookingFormSlice'
import BikesSelect from './BikeSelect'
import { getRange } from '@/src/store/selectors'

const BikeForm = () => {
   const dispatch = useDispatch()
   const r = useSelector(getRange)
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
         {r && <BikesSelect />}
      </Stack>
   )
}

export default BikeForm
