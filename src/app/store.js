import {
   configureStore,
   createListenerMiddleware,
   isAnyOf,
} from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from './apiServices/baseApi'
import bookingProcessReducer, {
   dateSelected,
   setSize,
   testAction,
} from './features/user/booking/bookingProcessSlice'
import drawerReducer from './drawerSlice'
import bookingCalendarReducer from './features/admin/bookingCalendarSlice'

import databaseInfoReducer from './databaseInfoSlice'

// Create the middleware instance and methods
const listenerMiddleware = createListenerMiddleware()
// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
//https://redux-toolkit.js.org/api/createListenerMiddleware#basic-usage

listenerMiddleware.startListening({
   actionCreator: testAction,
   effect: (action, listenerApi) => {
      console.log('*************', action.payload)
      // listenerApi.cancelActiveListeners()
   },
})

const makeStore = () =>
   configureStore({
      reducer: {
         drawer: drawerReducer,
         bookingProcess: bookingProcessReducer,
         bookingCalendar: bookingCalendarReducer,

         databaseInfo: databaseInfoReducer,
         [baseApi.reducerPath]: baseApi.reducer,
      },

      // Add the listener middleware to the store.
      // NOTE: Since this can receive actions with functions inside,
      // it should go before the serializability check middleware

      // Adding the api middleware enables caching, invalidation, polling,
      // and other useful features of `rtk-query`.
      middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware()
            .concat(baseApi.middleware)
            .prepend(listenerMiddleware.middleware),

      devTools: true,
   })

export const storeWrapper = createWrapper(makeStore)

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization

//setupListeners(store.dispatch)
