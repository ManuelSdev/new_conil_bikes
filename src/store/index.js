import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from './services/baseApi'
import bookingFormReducer from './bookingFormSlice'
import drawerReducer from './drawerSlice'
import bookingCalendarReducer from './bookingCalendarSlice'
import currentBookingReducer from './currentBookingSlice'
import databaseInfoReducer from './databaseInfoSlice'

const makeStore = () =>
   configureStore({
      reducer: {
         drawer: drawerReducer,
         bookingForm: bookingFormReducer,
         bookingCalendar: bookingCalendarReducer,
         currentBooking: currentBookingReducer,
         databaseInfo: databaseInfoReducer,
         [baseApi.reducerPath]: baseApi.reducer,
      },
      // Adding the api middleware enables caching, invalidation, polling,
      // and other useful features of `rtk-query`.
      middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware().concat(baseApi.middleware),
      devTools: true,
   })

export const storeWrapper = createWrapper(makeStore)

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization

//setupListeners(store.dispatch)
