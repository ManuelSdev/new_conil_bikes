import { useEffect } from 'react'
import {
   Box,
   FormControl,
   InputLabel,
   LinearProgress,
   MenuItem,
   Select,
} from '@mui/material'
import { setRange } from '@/src/store/bookingFormSlice'
import {
   getDatabaseInfo,
   getDate,
   getRange,
   getSize,
   getType,
} from '@/src/store/selectors'
import { useLazyGetAvaiableRangesQuery } from '@/src/store/services/bikeApi'
import { rangesList } from '@/src/utils/appValues'
import { capitalizeFirst } from '@/src/utils/functions'
import { useDispatch, useSelector } from 'react-redux'

//TODO: busca y limpia URLSearchParams
const RangeSelect = () => {
   const dispatch = useDispatch()
   const isoDate = useSelector(getDate)
   const selectedSize = useSelector(getSize)
   const selectedType = useSelector(getType)
   const selectedRange = useSelector(getRange)
   const { segmentList } = useSelector(getDatabaseInfo)
   //   console.log(segmentList)
   const segmentPrice_ = (range) =>
      segmentList.reduce((acc, segment) => {
         console.log('--------- ', acc)
         if (
            selectedType === segment.bikemodeltype &&
            range === segment.bikemodelrange
         ) {
            console.log('selectedtype', selectedType)
            console.log('segment.bikemodeltype', segment.bikemodeltype)
            console.log('range', range)
            console.log('segment.bikemodelrange', segment.bikemodelrange)
            console.log('price ', segment.segmentprice)
            return acc + segment.segmentprice
         } else return acc
      }, 0)
   const segmentPrice = (segmentList, range, type) =>
      segmentList.filter(
         (segment) => segment.type === type && segment.range === range
      )

   const rangeInfo = (range) => {
      let price
      segmentList.forEach((segment) => {
         if (selectedType == segment.type && range == segment.range)
            price = segment.price
      })
      return price ? `${price} €/día` : 'Gama no disponible'
   }

   const params = (b) => new URLSearchParams(b)
   const args = {
      ...isoDate,
      size: selectedSize,
      type: selectedType,
   }

   const handleChange = (event) => {
      //  console.log('@@@@@@@@ handleChange rangeSelect')
      dispatch(setRange(event.target.value))
   }

   const [trigger, { data: avaiableRanges, isLoading }, lastPromiseInfo] =
      useLazyGetAvaiableRangesQuery()

   useEffect(() => {
      selectedRange &&
         //  console.log('@@@@@@@@ dispatch rangeSelect') ||
         dispatch(setRange(''))
      selectedType &&
         //   console.log('@@@@@@@@ trigger rangeSelect') ||
         trigger(args)
   }, [selectedType])

   const loadingLabel = () => (
      <Box>
         Cargando gamas disponibles
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

   return (
      <FormControl fullWidth disabled={!!!selectedType}>
         <InputLabel id="bike-range-select-label" sx={{ width: '100%' }}>
            {isLoading ? loadingLabel() : 'Gama'}
         </InputLabel>
         <Select
            required
            labelId="bike-range-select-label"
            id="bike-range-select"
            onChange={handleChange}
            label="Range"
            value={selectedRange}
         >
            {rangesList.map((range) => {
               const [engRange, spaRange] = range
               return (
                  <MenuItem
                     disabled={
                        avaiableRanges
                           ? !avaiableRanges.includes(engRange)
                           : true
                     }
                     key={engRange}
                     value={engRange}
                  >
                     {`${capitalizeFirst(spaRange)} - ${rangeInfo(engRange)}`}
                  </MenuItem>
               )
            })}
         </Select>
      </FormControl>
   )
}

export default RangeSelect
