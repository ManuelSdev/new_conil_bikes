import Stack from '@mui/material/Stack'
import SizeSelect from './SizeSelect'
import TypeSelect from './TypeSelect'
import RangeSelect from './RangeSelect'
//import BikesSelect from "./BikeSelect"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
   selectIsoStringDateRange,
   setAnotherForm,
} from '@/src/app/features/user/booking/bookingProcessSlice'
import BikesSelect from './BikeSelect'
import {
   useLazyGetAvaiableRangesQuery,
   useLazyGetAvaiableTypesQuery,
} from '@/src/app/apiServices/bikeApi'
import { Box, LinearProgress } from '@mui/material'

const LoadingLabel = ({ text }) => (
   <Box>
      {text}
      <LinearProgress
         sx={
            {
               //      backgroundColor: 'grey',
               //      color: 'red',
               //display: 'flex',
               //       justifySelf: 'center',
               //      position: 'relative',
               //   '&..MuiCircularProgress-root.MuiCircularProgress-svg': { position: 'relative' },
            }
         }
      />
   </Box>
)

const BikeForm = () => {
   const dispatch = useDispatch()
   const dateRange = useSelector(selectIsoStringDateRange)

   const initialForm = {
      size: '',
      type: '',
      range: '',
   }

   const [form, setForm] = useState(initialForm)

   const { size, type, range, bikes } = form

   const handleSize = (event) => {
      //setAge(event.target.value);
      setForm({ ...initialForm, size: event.target.value })
   }

   const handleType = (event) => {
      //setAge(event.target.value);
      setForm({ ...initialForm, size, type: event.target.value })
   }

   const handleRange = (event) => {
      //setAge(event.target.value);
      setForm({ size, type, range: event.target.value })
   }
   const [
      triggerType,
      {
         data: avaiableTypes,
         isLoading: isLoadingTypes,
         isSuccess: isSuccessTypes,
         unsubscribe: unsubscribeTypes,
      },
      lastPromiseInfoTypes,
   ] = useLazyGetAvaiableTypesQuery()

   const [
      triggerRange,
      { data: avaiableRanges, isLoading: isLoadingRange },
      lastPromiseInfoRanges,
   ] = useLazyGetAvaiableRangesQuery()

   useEffect(() => {
      size && triggerType({ ...dateRange, size })
   }, [size])

   useEffect(() => {
      type && triggerRange({ ...dateRange, size, type })
   }, [type])

   console.log('BIKE FORM', form)
   return (
      <Stack spacing={2}>
         <SizeSelect
            selectedSize={size}
            handleChange={handleSize}
            LoadingLabel={LoadingLabel}
         />
         <TypeSelect
            form={form}
            avaiableTypes={avaiableTypes}
            handleChange={handleType}
            isLoading={isLoadingTypes}
            LoadingLabel={LoadingLabel}
         />
         <RangeSelect
            form={form}
            avaiableRanges={avaiableRanges}
            handleChange={handleRange}
            isLoading={isLoadingRange}
            LoadingLabel={LoadingLabel}
         />
         <BikesSelect dateRange={dateRange} form={form} />
      </Stack>
   )
}

export default BikeForm
