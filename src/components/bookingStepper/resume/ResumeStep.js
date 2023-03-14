import { useSelector } from 'react-redux'
import { Typography, Box, Divider, Stack } from '@mui/material'
import { format } from 'date-fns'

import SelectedBikesTable from './SelectedBikesTable'
import {
   selectBookingDayPrice,
   selectBookingDuration,
   selectDateRange,
   selectUser,
} from '@/src/app/features/user/booking/bookingProcessSlice'

//limpia
const ResumeStep = () => {
   const bookingDayPrice = useSelector(selectBookingDayPrice)
   const bookingDuration = useSelector(selectBookingDuration)
   const { from, to } = useSelector(selectDateRange)
   const { name, surname, address, phone, mail, homeDelivery, homePickup } =
      useSelector(selectUser)

   const userData = [name, surname, address, phone, mail]

   const data = ['Nombre', 'Email', 'Teléfono', 'Dirección']

   const bookingTotalPrice = bookingDayPrice * bookingDuration
   return (
      <Box>
         <Box>
            <Typography variant="h6">Fecha</Typography>
            <Typography variant="subtitle2">
               <strong>Inicio: </strong>
               {format(from, 'dd/MM/yyyy')}
            </Typography>
            <Typography variant="subtitle2">
               <strong>Fin: </strong>
               {format(to, 'dd/MM/yyyy')}
            </Typography>
            <Typography variant="subtitle2">
               <strong>Días: </strong>
               {bookingDuration}
            </Typography>
         </Box>

         <Divider sx={{ mt: 1, mb: 1 }}></Divider>

         <Box
         //       sx={{ marginTop: 0 }}
         >
            <Typography variant="h6">Datos de contacto</Typography>
            {userData.map((elem, index) => (
               <Typography key={elem} variant="subtitle2">
                  <strong>{data[index]}: </strong>
                  {elem}
               </Typography>
            ))}
            <Typography variant="subtitle2">
               <strong>
                  {homeDelivery
                     ? '- Las bicicletas se entregarán en la dirección seleccionada el día de inicio de la reserva'
                     : '- Las bicicletas se recogerán en tienda el día de inicio de la reserva'}
               </strong>
            </Typography>
            <Typography variant="subtitle2">
               <strong>
                  {homePickup
                     ? '- Las bicicletas se recogerán en la dirección seleccionada el último día de la reserva'
                     : '- Las bicicletas se devolverán en tienda el último día de la reserva'}
               </strong>
            </Typography>
         </Box>

         <Divider sx={{ mt: 1, mb: 1 }}></Divider>

         <Box
         //       sx={{ marginTop: 0 }}
         >
            <Typography variant="h6">Bicicletas</Typography>
            <SelectedBikesTable />
         </Box>

         <Divider sx={{ mt: 1, mb: 1 }}></Divider>

         <Stack
            pr={1}
            pl={1}
            direction="row"
            justifyContent="space-between"
            sx={{ width: '100%' }}
            //mb={5}
         >
            <Typography
               //  sx={{ fontWeight: 'bold' }}
               //align='left'
               component="div"
               variant="subtitle1"
            >
               Total por día
            </Typography>
            <Typography
               component="div"
               //    sx={{ fontWeight: 'bold' }}
               //align='right'
               variant="subtitle1"
            >
               {bookingDayPrice} €
            </Typography>
         </Stack>

         <Stack
            pr={1}
            pl={1}
            direction="row"
            justifyContent=" space-between"
            sx={{ width: '100%' }}
         >
            <Typography
               //  sx={{ fontWeight: 'bold' }}
               //align='left'
               component="div"
               variant="subtitle1"
            >
               Días
            </Typography>
            <Typography
               component="div"
               //    sx={{ fontWeight: 'bold' }}
               //align='right'
               variant="subtitle1"
            >
               {bookingDuration}
            </Typography>
         </Stack>

         <Stack
            pr={1}
            pl={1}
            direction="row"
            justifyContent="space-between"
            sx={{ width: '100%' }}
         >
            <Typography
               sx={{ fontWeight: 'bold' }}
               //align='left'
               component="div"
               variant="h6"
            >
               TOTAL
            </Typography>
            <Typography
               component="div"
               sx={{ fontWeight: 'bold' }}
               //align='right'
               variant="h6"
            >
               {bookingTotalPrice} €
            </Typography>
         </Stack>
      </Box>
   )
}

export default ResumeStep
