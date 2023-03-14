import { selectDatabaseInfoSegmentList } from '@/src/app/databaseInfoSlice'
import { createSelector, createSlice, current } from '@reduxjs/toolkit'
import { differenceInDays, format } from 'date-fns'

const initialState = {
   bikeFormIsEnable: true,
   dateError: '',

   dateRange: {},
   bikes: [],
   user: {
      name: '',
      surname: '',
      address: '',
      phone: '',
      mail: '',
      homeDelivery: false,
      homePickup: false,
   },

   test: 0,
}

export const bookingFormSlice = createSlice({
   name: 'bookingProcess',
   initialState,
   reducers: {
      bikeFormEnabled: (state) => {
         state.bikeFormIsEnable = true
      },
      bikeFormDisabled: (state) => {
         state.bikeFormIsEnable = false
      },
      dateSelected: (state, action) => {
         const [picker, value] = action.payload
         state.dateRange = { ...state.dateRange, [picker]: value }
      },

      dateErrorChanged: (state, action) => {
         const reason = action.payload
         const { from } = state.date
         state.dateError = reason
            ? `Seleccione una fecha superior a ${format(
                 new Date(from),
                 'dd/MM/yyyy'
              )} o modifique la fecha de inicio`
            : ''
      },

      dateModified: (state) => {
         state.bikes = []
      },
      bikeSelected: (state, action) => {
         //No desctructure count propertie and add quantity property
         const { id, size, model, type, range, brand, description, images } =
            action.payload
         const newBike = {
            id,
            size,
            model,
            type,
            range,
            brand,
            description,
            images,
            quantity: 1,
         }
         const exist = state.bikes.some(
            (bike) => bike.size === size && bike.id === id
         )
         state.bikes = exist
            ? state.bikes.map((bike) => {
                 if (bike.size === size && bike.id === id) {
                    return { ...bike, quantity: bike.quantity + 1 }
                 } else return bike
              })
            : [...state.bikes, newBike]
         // state.bikes.push(action.payload)
      },
      //El usuario elimina una bicicleta
      bikeRemoved: (state, action) => {
         console.log(action.payload)
         const bike = action.payload
         const { id, size } = bike
         //Comprueba si solo hay una unidad/quantity===1
         const onlyOne = state.bikes.some(
            (bike) =>
               bike.size === size && bike.id === id && bike.quantity === 1
         )
         //    console.log('only one', onlyOne)
         if (onlyOne) {
            console.log('only one------------')
            state.bikes = state.bikes.filter(
               (bike) => !(bike.size === size && bike.id === id)
            )
         } else {
            console.log('MAS DE UNA***********')
            state.bikes = state.bikes.map((bike) => {
               if (bike.size === size && bike.id === id) {
                  return { ...bike, quantity: bike.quantity - 1 }
               } else return bike
            })
         }
      },
      //Una o más bicicletas son eliminadas cuando la base de datos retorna una cantidad disponible
      //inferior a la cantidad seleccionada por el usuario
      bikeRemovedBySync: (state, action) => {
         const bike = action.payload
         const { id, size, count } = bike
         /**
          * count representa la última cantidad conocida de unidades en la base de datos
          * para un id+size determinado.
          * Si count incluye un valor, significa que que la ultima petición al api para
          * obtener bicicletas seleccionables incluía, para un id+size, un count cuyo valor
          *  es inferior a la cantidad/quantity de ese id+size que el cliente había seleccionado
          * previamente y se encuentra almacenado en state.bikes
          *
          */
         //TODO: MENSAJE MODAL DE QUE HAS BORRADO Y ESO
         state.bikes = state.bikes.map((bike) => {
            if (bike.size === size && bike.id === id) {
               return { ...bike, quantity: count }
            } else return bike
         })
      },
      userAdded: (state, action) => {
         state.user = action.payload
      },

      setAnotherForm: (state, action) => {
         state.size = ''
         state.type = ''
         state.range = ''
      },

      testAction: (state, action) => {
         state.test = action.payload
      },
   },
})

export const {
   testAction,
   bikeFormEnabled,
   bikeFormDisabled,
   dateSelected,
   dateErrorChanged,
   bikeSelected,
   bikeRemoved,
   bikeRemovedBySync,
   dateModified,
   userAdded,
   //  setAnotherForm,
} = bookingFormSlice.actions

export default bookingFormSlice.reducer

/*************************************** IMPUT SELECTORS ******************************************************/
//Pure state selector
const selectBookingProcess = (state) => state.bookingProcess

//Created selectors
//ISOstring format
export const selectStrDateRange = createSelector(
   [selectBookingProcess],
   (bookingProcess) =>
      console.log('XXXXXXXXXXXX  selectStrDateRange') ||
      bookingProcess.dateRange
)
export const selectBikeFormIsEnable = createSelector(
   [selectBookingProcess],
   (bookingProcess) => bookingProcess.bikeFormIsEnable
)
export const selectDateError = createSelector(
   [selectBookingProcess],
   (bookingProcess) =>
      console.log('XXXXXXXXXXXX  selectDateError') || bookingProcess.dateError
)

export const selectSize = createSelector(
   [selectBookingProcess],
   (bookingProcess) =>
      console.log('XXXXXXXXXXXX selectSize') || bookingProcess.size
)

export const selectUser = createSelector(
   [selectBookingProcess],
   (bookingProcess) =>
      console.log('XXXXXXXXXXXX selectUser') || bookingProcess.user
)
/**
 * Retorna la lista de bicis del store, donde cada elemento puede representar
 * una o más bicicletas según la propiedad quantity
 */
export const selectBikes = createSelector(
   [selectBookingProcess],
   (bookingProcess) =>
      console.log('XXXXXXXXXXXX selectBikes') || bookingProcess.bikes
)

export const selectDateRange = createSelector(
   [selectStrDateRange],
   (dateRange) => {
      const { from, to } = dateRange
      const formatedDateRange = {
         from: from ? new Date(from) : null,
         to: to ? new Date(to) : null,
      }
      return formatedDateRange
   }
)

//Retorna una lista donde cada elemento es una bici sin la propiedad quantity
export const selectBikesByUnits = createSelector([selectBikes], (bikes) => {
   const bikesInUnits = bikes.map((bike) => {
      const multipleItem = []
      let n = 1
      const { quantity } = bike
      while (n <= quantity) {
         multipleItem.push(bike)
         n++
      }
      return multipleItem
   })

   return bikesInUnits.flat()
})
export const selectNumberOfBikes = createSelector(
   [selectBikesByUnits],
   (bikesByUnits) => bikesByUnits.length
)

export const selectBookingDayPrice = createSelector(
   [selectDatabaseInfoSegmentList, selectBikesByUnits],
   (segmentList, bikesInUnits) => {
      const dayPrice = bikesInUnits.reduce((acc, bike) => {
         const { type, range } = bike
         const [{ price }] = segmentList.filter(
            (segment) => segment.type === type && segment.range === range
         )
         return acc + price
      }, 0)
      return dayPrice
   }
)

export const selectBookingDuration = createSelector(
   [selectDateRange],
   (dateRange) => {
      const { from, to } = dateRange
      const duration = differenceInDays(to, from)
      return duration
   }
)

export const selectBookingPrice = createSelector(
   [selectBookingDayPrice, selectBookingDuration],
   (bookingDayPrice, bookingDuration) => bookingDayPrice * bookingDuration
)

export const selectBookingData = createSelector(
   [
      selectStrDateRange,
      selectBikesByUnits,
      selectBookingDuration,
      selectBookingPrice,
      selectUser,
   ],
   (strDateRange, bikesByUnits, bookingDuration, bookingPrice, user) => {
      const { from, to } = strDateRange
      const bikes = bikesByUnits.map((bike) => ({
         id: bike.id,
         size: bike.size,
      }))
      const { name, surname, address, phone, mail, homeDelivery, homePickup } =
         user
      const duration = bookingDuration
      const price = bookingPrice
      const bookingData = {
         from,
         to,
         bikes,
         name,
         surname,
         address,
         phone,
         mail,
         homeDelivery,
         homePickup,
         price,
         duration,
      }
      return bookingData
   }
)
/**LISTENERS */

const dateListener = (action, listenerApi) => {
   console.log('*************', action.payload)
   // listenerApi.cancelActiveListeners()
}
