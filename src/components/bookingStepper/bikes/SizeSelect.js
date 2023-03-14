import * as React from 'react'

import { useSelector } from 'react-redux'
import {
   Box,
   FormControl,
   FormHelperText,
   InputLabel,
   MenuItem,
   Select,
} from '@mui/material'

import { sizesList } from '@/src/utils/appValues'
import { selectStrDateRange } from '@/src/app/features/user/booking/bookingProcessSlice'
import { useGetAvaiableSizesQuery } from '@/src/app/apiServices/bikeApi'

export default function SizeSelect({
   selectedSize,
   handleChange,
   LoadingLabel,
}) {
   const dateRange = useSelector(selectStrDateRange)

   const {
      data: avaiableSizes,
      isLoading,
      isSuccess,
      refetch,
      isFetching,
   } = useGetAvaiableSizesQuery(dateRange)

   return (
      <Box sx={{ minWidth: 120 }}>
         <FormControl fullWidth disabled={!!!avaiableSizes}>
            <InputLabel id="bike-size-select-label" sx={{ width: '100%' }}>
               {isLoading ? (
                  <LoadingLabel text={'Cargando tallas disponibles'} />
               ) : (
                  'Talla'
               )}
            </InputLabel>
            <Select
               labelId="bike-size-select-label"
               id="bike-size-select"
               value={selectedSize}
               label="Size"
               onChange={handleChange}
            >
               {sizesList.map((elem) => {
                  const [size, [min, max]] = elem
                  return (
                     <MenuItem
                        disabled={
                           avaiableSizes ? !avaiableSizes.includes(size) : true
                        }
                        key={size}
                        value={size}
                     >
                        {`${size.toUpperCase()} - si mides entre ${min} y ${max} cm `}
                     </MenuItem>
                  )
               })}
            </Select>
            <FormHelperText>
               Selecciona una talla en función de tu altura
            </FormHelperText>
         </FormControl>
      </Box>
   )
}
