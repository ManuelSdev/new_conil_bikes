import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { rangesList } from '@/src/utils/appValues'
import { capitalizeFirst } from '@/src/utils/functions'
import { useSelector } from 'react-redux'
import { selectDatabaseInfoSegmentList } from '@/src/app/databaseInfoSlice'

//TODO: busca y limpia URLSearchParams
const RangeSelect = ({
   avaiableRanges,
   handleChange,
   isLoading,
   form,
   LoadingLabel,
}) => {
   const segmentList = useSelector(selectDatabaseInfoSegmentList)

   const { type: selectedType, range: selectedRange } = form

   const rangeInfo = (range) => {
      let price
      segmentList.forEach((segment) => {
         if (selectedType == segment.type && range == segment.range)
            price = segment.price
      })
      return price ? `${price} €/día` : 'Gama no disponible'
   }

   return (
      <FormControl fullWidth disabled={!!!selectedType}>
         <InputLabel id="bike-range-select-label" sx={{ width: '100%' }}>
            {isLoading ? (
               <LoadingLabel text={'Cargando gamas disponibles'} />
            ) : (
               'Gama'
            )}
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
