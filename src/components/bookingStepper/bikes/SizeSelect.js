import * as React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
   Box,
   FormControl,
   FormHelperText,
   InputLabel,
   LinearProgress,
   MenuItem,
   Select,
} from '@mui/material'
import { compareAsc } from 'date-fns'

import { sizesList } from '@/src/utils/appValues'
import { getDate, getDateError, getSize } from '@/src/store/selectors'
import { setSize } from '@/src/store/bookingFormSlice'
import { useGetAvaiableSizesQuery } from '@/src/store/services/bikeApi'

const loadingLabel = () => (
   <Box>
      Cargando tallas disponibles
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
export default function SizeSelect() {
   const dispatch = useDispatch()
   const isoDate = useSelector(getDate)
   const dateError = useSelector(getDateError)
   const selectedSize = useSelector(getSize)

   const [skip, setSkip] = React.useState(true)
   const handleChange = (event) => {
      //setAge(event.target.value);
      dispatch(setSize(event.target.value))
   }

   const {
      data: avaiableSizes,
      isLoading,
      isSuccess,
      refetch,
      isFetching,
   } = useGetAvaiableSizesQuery(isoDate, {
      skip,
      // refetchOnMountOrArgChange: true
   })

   //console.log('+++++++++++++', avaiableSizes)
   const dateIsCorrect = () =>
      !!isoDate.from &&
      !!isoDate.to &&
      compareAsc(new Date(isoDate.to), new Date(isoDate.from)) === 1 &&
      !!!dateError
         ? true
         : false

   React.useEffect(() => {
      if (dateIsCorrect())
         skip
            ? //     console.log('skip----------------------') ||
              setSkip(false)
            : //     console.log('dispatch+++++++++++++++++++++') ||
              dispatch(setSize(''))
   }, [isoDate])

   return (
      <Box sx={{ minWidth: 120 }}>
         <FormControl fullWidth disabled={!!!avaiableSizes}>
            <InputLabel id="bike-size-select-label" sx={{ width: '100%' }}>
               {isLoading ? loadingLabel() : 'Talla'}
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
