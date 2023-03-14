import { Stack, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
   Radio,
   RadioGroup,
   FormControlLabel,
   FormControl,
   FormLabel,
} from '@mui/material'

import {
   selectUser,
   userAdded,
} from '@/src/app/features/user/booking/bookingProcessSlice'

import { useEffect, useState } from 'react'

const ContactStep = () => {
   const [form, setForm] = useState({
      name: '',
      surname: '',
      address: '',
      phone: '',
      mail: '',
      homeDelivery: false,
      homePickup: false,
   })

   const { name, surname, address, phone, mail, homeDelivery, homePickup } =
      form
   const textFieldList = [name, surname, address, phone, mail]
   const dispatch = useDispatch()

   useEffect(() => {
      if (textFieldList.every((elem) => !!elem)) dispatch(userAdded(form))

      return () => true
   }, [form])

   /*
   const idMap = {
      name: setName,
      address: setAddress,
      phone: setPhone,
      mail: setMail,
      homeDelivery: setHomeDelivery,
      homePickup: setHomePickup,
   }
   */
   const handleChange = (event) => {
      const { name, value } = event.target
      if (value === 'true') setForm({ ...form, [name]: true })
      else if (value === 'false') setForm({ ...form, [name]: false })
      else setForm({ ...form, [name]: value })
   }
   const handleChanges = (event) => {
      const { name, value } = event.target
      if (value === 'true') dispatch(idMap[name](true))
      else if (value === 'false') dispatch(idMap[name](false))
      else dispatch(idMap[name](value))
   }
   console.log(form)
   return (
      <Stack component="form" mb={2} spacing={2}>
         <TextField
            fullWidth
            name="name"
            label="Nombre"
            value={name}
            onChange={handleChange}
         />
         <TextField
            fullWidth
            name="surname"
            label="Apellidos"
            value={surname}
            onChange={handleChange}
         />
         <TextField
            fullWidth
            name="phone"
            label="Teléfono"
            value={phone}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            //  inputProps={{ type: 'hidden' }}
            onChange={handleChange}
         />
         <TextField
            fullWidth
            name="mail"
            label="Correo eléctronico"
            value={mail}
            onChange={handleChange}
         />
         <TextField
            fullWidth
            name="address"
            label="Dirección de entrega"
            value={address}
            onChange={handleChange}
            helperText="Indica donde quieres que te entreguemos las bicicletas"
         />
         <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
               ¿Recogerás las bicis en nuestra tienda o prefieres que te las
               entreguemos en otra dirección?
            </FormLabel>
            <RadioGroup
               aria-labelledby="homeDelivery-radio-buttons-group"
               name="homeDelivery"
               value={homeDelivery}
               onChange={handleChange}
            >
               <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="Recogida en tienda"
               />
               <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Entrega a domicilio"
               />
            </RadioGroup>
         </FormControl>
         <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
               Entrega de bicicletas al finalizar la reserva
            </FormLabel>
            <RadioGroup
               aria-labelledby="homePickup-radio-buttons-group"
               name="homePickup"
               value={homePickup}
               onChange={handleChange}
            >
               <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="Entrega en tienda"
               />
               <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Recogida a domicilio"
               />
            </RadioGroup>
         </FormControl>
      </Stack>
   )
}

export default ContactStep
