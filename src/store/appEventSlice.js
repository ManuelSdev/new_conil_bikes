import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
   from: '',
   to: '',
   name: '',
   address: '',
   mail: '',
   phone: '',
   bikes: [],
   homeDelivery: false,
   homePickup: false,
   price: 0,
   state: '',
   _id: '',
}

export const appEventSlice = createSlice({
   name: 'currentBooking',
   initialState,
   reducers: {
      setCurrentBooking: (state, action) => {
         return action.payload
      },
   },
})

export const { setCurrentBooking } = appEventSlice.actions

export default appEventSlice.reducer
