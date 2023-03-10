import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
   addButton: true,
   formIsActive: true,
   dateError: '',

   size: '',
   type: '',
   range: '',

   date: {},
   bikes: [],
   name: '',
   address: '',
   phone: '',
   mail: '',
   homeDelivery: false,
   homePickup: false,
}

export const bookingFormSlice = createSlice({
   name: 'bookingForm',
   initialState,
   reducers: {
      setAddButton: (state, action) => {
         state.addButton = action.payload
      },
      setFormIsActive: (state, action) => {
         state.formIsActive = action.payload
      },
      setDate: (state, action) => {
         const [key, value] = action.payload
         state.date = { ...state.date, [key]: value }
      },
      setDateError: (state, action) => {
         state.dateError = action.payload
      },
      setSize: (state, action) => {
         state.size = action.payload
      },
      setType: (state, action) => {
         state.type = action.payload
      },
      setRange: (state, action) => {
         state.range = action.payload
      },
      resetBikes: (state) => {
         state.bikes = []
      },
      addBike: (state, action) => {
         state.bikes.push(action.payload)
      },
      deleteBike: (state, action) => {
         const start = state.bikes.findIndex(
            (bike) =>
               bike.id === action.payload.id &&
               bike.size === action.payload.size
         )
         state.bikes.splice(start, 1)
      },
      setName: (state, action) => {
         state.name = action.payload
      },
      setAddress: (state, action) => {
         state.address = action.payload
      },
      setPhone: (state, action) => {
         state.phone = action.payload
      },
      setMail: (state, action) => {
         state.mail = action.payload
      },
      setHomeDelivery: (state, action) => {
         state.homeDelivery = action.payload
      },
      setHomePickup: (state, action) => {
         state.homePickup = action.payload
      },
      setAnotherForm: (state, action) => {
         state.size = ''
         state.type = ''
         state.range = ''
      },
   },
})

export const {
   setFormIsActive,
   setAddButton,
   setDate,
   setDateError,
   setSize,
   setType,
   setRange,
   addBike,
   deleteBike,
   resetBikes,
   setName,
   setAddress,
   setPhone,
   setMail,
   setHomeDelivery,
   setHomePickup,
   setAnotherForm,
} = bookingFormSlice.actions

export default bookingFormSlice.reducer
