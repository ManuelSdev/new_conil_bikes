import { format, addYears, differenceInDays } from 'date-fns'

//Database constants
export const getDatabaseInfo = (state) => state.databaseInfo

// drawerSlice
export const getDrawerState = (state) => state.drawer.isOpen

// bookingFormSlice
export const getFormIsActive = (state) => state.bookingForm.formIsActive

export const getAddButton = (state) => state.bookingForm.addButton
export const getDate = (state) => state.bookingForm.date
export const getDateError = (state) => state.bookingForm.dateError
export const getSize = (state) => state.bookingForm.size
export const getType = (state) => state.bookingForm.type
export const getRange = (state) => state.bookingForm.range

export const getName = (state) => state.bookingForm.name
export const getAddress = (state) => state.bookingForm.address
export const getPhone = (state) => state.bookingForm.phone
export const getMail = (state) => state.bookingForm.mail
export const getPrice = (state) => state.bookingForm.price
export const getHomeDelivery = (state) => state.bookingForm.homeDelivery
export const getHomePickup = (state) => state.bookingForm.homePickup

export const getContactInfo = (state) => [
   state.bookingForm.name,
   state.bookingForm.mail,
   state.bookingForm.phone,
   state.bookingForm.address,
   //state.bookingForm.homeDelivery,
   // state.bookingForm.homePickup,
]

export const getBookingData = (state) => ({
   from: state.bookingForm.date.from,
   to: state.bookingForm.date.to,
   bikes: state.bookingForm.bikes.map((bike) => ({
      id: bike.id,
      size: bike.size,
   })),
   name: state.bookingForm.name,
   address: state.bookingForm.address,
   phone: state.bookingForm.phone,
   price: state.bookingForm.price,
   mail: state.bookingForm.mail,
   homeDelivery: state.bookingForm.homeDelivery,
   homePickup: state.bookingForm.homePickup,
})
export const getBikes = (state) => state.bookingForm.bikes
export const getNumberOfBikes = (state) => state.bookingForm.bikes.length

export const getCalendarSelectedDay = (state) =>
   state.bookingCalendar.selectedDay

export const getCalendarBookingsOnDate = (state) => {
   return {
      bookingsStarting: state.bookingCalendar.bookingsStarting,
      bookingsEnding: state.bookingCalendar.bookingsEnding,
   }
}

export const getCurrentBooking = (state) => state.currentBooking

export const getBookingDayPrice = (state) => {
   const { segmentList } = getDatabaseInfo(state)
   const dayPrice = state.bookingForm.bikes.reduce((acc, bike) => {
      const { type, range } = bike
      const [{ price }] = segmentList.filter(
         (segment) => segment.type === type && segment.range === range
      )
      return acc + price
   }, 0)
   return dayPrice
}

export const getBookingDuration = (state) => {
   const isoDate = getDate(state)
   const date = {
      from: isoDate.from ? new Date(isoDate.from) : null,
      to: isoDate.to ? new Date(isoDate.to) : null,
   }
   const duration = differenceInDays(date.to, date.from)
   return duration
}

export const getBookingPrice = (state) =>
   getBookingDayPrice(state) * getBookingDuration(state)
