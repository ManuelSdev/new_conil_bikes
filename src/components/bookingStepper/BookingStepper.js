import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
   Button,
   Paper,
   Stack,
   Typography,
   Stepper,
   Step,
   StepLabel,
   Box,
} from '@mui/material'

import ConfirmBookingButton from './ConfirmBookingButton'
import ContactStep from './contact/ContactStep'
import ResumeStep from './resume/ResumeStep'
import DateStep from './date/DateStep'
import BikesStep from './bikes/BikesStep'
import {
   selectDateError,
   selectNumberOfBikes,
   selectStrDateRange,
   selectUserInfo,
   userInfoAdded,
} from '@/src/app/features/user/booking/bookingProcessSlice'

//TODO: chapuza?
const steps = ['Fecha', 'Bicicletas', 'Contacto', 'Resumen']

const StepWrapper = ({ children, textHeader }) => (
   <Box>
      <Typography sx={{ mt: 1, mb: 1 }} variant="h5" component="div">
         {textHeader}
      </Typography>
      <Paper
         elevation={1}
         p={1}
         component={Stack}
         sx={{ width: '100%' }}
         // mb={5}
         //  spacing={1}
      >
         {children}
      </Paper>
   </Box>
)

export default function BookingStepper() {
   const amount = useSelector(selectNumberOfBikes)
   const { from, to } = useSelector(selectStrDateRange)
   const dateError = useSelector(selectDateError)
   //onst { name, surname, mail, phone, address } = useSelector(selectUserInfo)

   //

   const [activeStep, setActiveStep] = useState(0)
   const [completed, setCompleted] = useState({})
   const totalSteps = () => {
      return steps.length
   }

   const completedSteps = () => {
      return Object.keys(completed).length
   }

   const isLastStep = () => {
      return activeStep === totalSteps() - 1
   }
   const handleNext = () => {
      const newActiveStep =
         isLastStep() && !allStepsCompleted()
            ? // It's the last step, but not all steps have been completed,
              // find the first step that has been completed
              steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1
      setActiveStep(newActiveStep)
   }
   const allStepsCompleted = () => {
      return completedSteps() === totalSteps()
   }
   const handleBack = () => {
      activeStep > 0 && setActiveStep((prevActiveStep) => prevActiveStep - 1)
   }
   /**formulario contacto */
   //TODO: SACA ESTO DE AQUÍ
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
   const handleChange = (event) => {
      const { name, value } = event.target
      if (value === 'true') setForm({ ...form, [name]: true })
      else if (value === 'false') setForm({ ...form, [name]: false })
      else setForm({ ...form, [name]: value })
   }
   const dispatch = useDispatch()
   const handleClick = (ev) => {
      dispatch(userInfoAdded(form))
      handleNext()
   }
   //TODO terminar esta validación chusquera
   const contactInfo = [name, surname, address, phone, mail]
   const contactInfoIsValid = () => contactInfo.every((elem) => !!elem)
   console.log('*************', !!!from)
   return (
      <Stack id="bookingStepper" spacing={2}>
         <Box
            //className="bg-primary.main py-4"
            py={2}
            sx={{ width: '100%', backgroundColor: 'primary.main' }}
         >
            <Stepper activeStep={activeStep} alternativeLabel>
               {steps.map((label) => (
                  <Step key={label}>
                     <StepLabel>{label}</StepLabel>
                  </Step>
               ))}
            </Stepper>
         </Box>
         <Box
            mb={2}
            sx={{
               display: 'flex',
               justifyContent: 'center',
               flexDirection: 'column',
               flexGrow: 1,
               marginTop: '30px',
            }}
         >
            {activeStep === 0 ? (
               <StepWrapper textHeader={'Selecciona la fecha'}>
                  {' '}
                  <DateStep />
               </StepWrapper>
            ) : activeStep === 1 ? (
               <StepWrapper textHeader={'Elige las bicicletas'}>
                  <BikesStep />
               </StepWrapper>
            ) : activeStep === 2 ? (
               <StepWrapper textHeader={'Indica tus datos de contacto'}>
                  {' '}
                  <ContactStep {...form} handleChange={handleChange} />
               </StepWrapper>
            ) : (
               <StepWrapper textHeader={'Resumen de tu reserva'}>
                  {' '}
                  <ResumeStep />
               </StepWrapper>
            )}
         </Box>
         {activeStep === 0 ? (
            <Button disabled={!from || !to || !!dateError} onClick={handleNext}>
               Continuar
            </Button>
         ) : activeStep === 1 ? (
            <Box>
               <Button
                  sx={{ mb: 2 }}
                  disabled={!!!amount}
                  fullWidth
                  onClick={handleNext}
               >
                  Continuar
               </Button>
               <Button onClick={handleBack}>Atras</Button>
            </Box>
         ) : activeStep === 2 ? (
            <Box>
               <Button
                  sx={{ mb: 2 }}
                  disabled={!contactInfoIsValid()}
                  fullWidth
                  onClick={handleClick}
               >
                  Continuar
               </Button>
               <Button onClick={handleBack}>Atras</Button>
            </Box>
         ) : (
            <Box>
               {/*<Button sx={{ mb: 2 }} fullWidth >Confirmar reserva</Button>*/}
               <ConfirmBookingButton />
               <Button onClick={handleBack}>Atras</Button>
            </Box>
         )}
      </Stack>
   )
}
