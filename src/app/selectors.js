import { format, addYears, differenceInDays } from 'date-fns'

//Database constants
export const getDatabaseInfo = (state) => state.databaseInfo

// drawerSlice
export const getDrawerState = (state) => state.drawer.isOpen

// bookingFormSlice
export const getFormIsActive = (state) => state.bookingProcess.formIsActive

export const getAddButton = (state) => state.bookingProcess.addButton
export const getDate = (state) => state.bookingProcess.date
export const getDateError = (state) => state.bookingProcess.dateError

export const getContactInfo = (state) => [
   state.bookingProcess.name,
   state.bookingProcess.mail,
   state.bookingProcess.phone,
   state.bookingProcess.address,
   //state.bookingProcess.homeDelivery,
   // state.bookingProcess.homePickup,
]

export const getBookingData = (state) => ({
   from: state.bookingProcess.date.from,
   to: state.bookingProcess.date.to,
   bikes: state.bookingProcess.bikes.map((bike) => ({
      id: bike.id,
      size: bike.size,
   })),
   name: state.bookingProcess.name,
   address: state.bookingProcess.address,
   phone: state.bookingProcess.phone,
   price: state.bookingProcess.price,
   mail: state.bookingProcess.mail,
   homeDelivery: state.bookingProcess.homeDelivery,
   homePickup: state.bookingProcess.homePickup,
})

export const getNumberOfBikes = (state) => state.bookingProcess.bikes.length

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
   const dayPrice = state.bookingProcess.bikes.reduce((acc, bike) => {
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
