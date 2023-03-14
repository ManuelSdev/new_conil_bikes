import {
   Box,
   FormControl,
   InputLabel,
   LinearProgress,
   MenuItem,
   Select,
} from '@mui/material'

import { typesList } from '@/src/utils/appValues'
import { capitalizeFirst } from '@/src/utils/functions'

const TypeSelect = ({
   avaiableTypes,
   handleChange,
   isLoading,
   form,
   LoadingLabel,
}) => {
   const { size, type } = form

   return (
      <FormControl fullWidth disabled={!!!size}>
         <InputLabel id="bike-type-select-label" sx={{ width: '100%' }}>
            {isLoading ? (
               <LoadingLabel text={'Cargando tipos de bicicleta'} />
            ) : (
               'Tipo'
            )}
         </InputLabel>

         <Select
            required
            labelId="bike-type-select-label"
            id="bike-type-select"
            onChange={handleChange}
            label="Type"
            value={type}
         >
            {typesList.map((type) => {
               const [engType, spaType] = type
               return (
                  <MenuItem
                     disabled={
                        avaiableTypes ? !avaiableTypes.includes(engType) : true
                     }
                     key={engType}
                     value={engType}
                  >
                     {capitalizeFirst(spaType)}
                  </MenuItem>
               )
            })}
         </Select>
      </FormControl>
   )
}

export default TypeSelect
