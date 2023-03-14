import { useDispatch, useSelector } from 'react-redux'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import esLocale from 'date-fns/locale/es'
import { Stack, TextField } from '@mui/material'

import {
   dateSelected,
   dateErrorChanged,
   selectDateError,
   selectDateRange,
   selectNumberOfBikes,
} from '@/src/app/features/user/booking/bookingProcessSlice'

//TODO: limpia
const FROM = 'from'
const TO = 'to'

const DateSelect = () => {
   const dispatch = useDispatch()
   //Si ya hay alguna bici seleccionada, numberOfBikes!=0 y se bloquea la selección de fecha
   const numberOfBikes = useSelector(selectNumberOfBikes)

   const dateError = useSelector(selectDateError)

   const { from, to } = useSelector(selectDateRange)

   const handleChange = (picker) => (newValue) => {
      newValue && dispatch(dateSelected([picker, newValue.toISOString()]))
   }

   const handleError = (reason, value) => {
      dispatch(dateErrorChanged(reason))
   }

   const adapter = new AdapterDateFns()

   const today = adapter.date(Date())

   const nextDay = (date) => adapter.addDays(date, 1)

   const nextYear = adapter.addYears(today, 1)

   return (
      <LocalizationProvider
         dateAdapter={AdapterDateFns}
         adapterLocale={esLocale} // use 'bg' locale for date parser/formatter
      >
         <Stack direction="row" spacing={1}>
            <DatePicker
               readOnly={!!numberOfBikes}
               label="Inicio"
               disablePast
               //      disableMaskedInput={true}
               inputFormat="dd/MM/yyyy"
               value={from}
               onChange={handleChange(FROM)}
               //  onAccept={handleChange('from')}

               //https://github.com/mui/material-ui-pickers/issues/1751
               renderInput={(params) => <TextField {...params} />}
               // renderDay={bookingPickersDay}
               minDate={nextDay(today)}
               maxDate={nextYear}
               toolbarTitle="Seleccione fecha de inicio"
               //   onError={handleError}
               //  onAccept={handleRtkQuery}
               // onClose={() => console.log('oncloseee')}
               defaultCalendarMonth={
                  to && new Date(to.getFullYear(), to.getMonth())
               }
            />
            <DatePicker
               readOnly={!!numberOfBikes}
               label="Fin"
               disablePast
               // disableMaskedInput={true}
               inputFormat="dd/MM/yyyy"
               value={to}
               onChange={handleChange(TO)}
               // onAccept={handleChange('to')}
               // onChange={handleChange('to')}
               renderInput={(params) => (
                  <TextField {...params} helperText={dateError && dateError} />
               )}
               minDate={nextDay(from)}
               maxDate={nextYear}
               onError={handleError}
               defaultCalendarMonth={
                  from && new Date(from.getFullYear(), from.getMonth())
               }
            />
         </Stack>
      </LocalizationProvider>
   )
}

export default DateSelect
