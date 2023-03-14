import { createSlice, current } from '@reduxjs/toolkit'
import { differenceInDays, format } from 'date-fns'

const initialState = {
   addButton: true,
   formIsActive: true,
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
      setAddButton: (state, action) => {
         state.addButton = action.payload
      },
      setFormIsActive: (state, action) => {
         state.formIsActive = action.payload
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

      resetBikes: (state) => {
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

      bikeRemoved: (state, action) => {
         const { id, size, count } = action.payload
         /**
          * count representa la última cantidad conocida de unidades en la base de datos
          * para un id+size determinado.
          * Si count incluye un valor, significa que que la ultima petición al api para
          * obtener bicicletas seleccionables incluía, para un id+size, un count cuyo valor
          *  es inferior a la cantidad/quantity de ese id+size que el cliente había seleccionado
          * previamente y se encuentra almacenado en state.bikes
          *
          */
         if (count) {
            state.bikes = state.bikes.map((bike) => {
               if (bike.size === size && bike.id === id) {
                  return { ...bike, quantity: count }
               } else return bike
            })
         } else {
            const onlyOne = state.bikes.some(
               (bike) =>
                  bike.size === size && bike.id === id && bike.quantity === 1
            )
            //    console.log('only one', onlyOne)
            state.bikes = onlyOne
               ? state.bikes.filter(
                    (bike) => bike.size !== size && bike.id !== id
                 )
               : state.bikes.map((bike) => {
                    if (bike.size === size && bike.id === id) {
                       return { ...bike, quantity: bike.quantity - 1 }
                    } else return bike
                 })
         }
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
   setFormIsActive,
   setAddButton,
   dateSelected,
   dateErrorChanged,
   bikeSelected,
   bikeRemoved,
   resetBikes,
   userAdded,
   //  setAnotherForm,
} = bookingFormSlice.actions

export default bookingFormSlice.reducer

/**SELECTORS */
//Date format
export const selectDateRange = (state) => {
   const range = state.bookingProcess.dateRange

   const date = {
      from: range.from ? new Date(range.from) : null,
      to: range.to ? new Date(range.to) : null,
   }
   //console.log(date)
   return date
}
//ISOstring Format
export const selectIsoStringDateRange = (state) =>
   state.bookingProcess.dateRange

export const selectDateError = (state) => state.bookingProcess.dateError

export const selectSize = (state) => state.bookingProcess.size

export const selectUser = (state) => state.bookingProcess.user

export const selectBikes = (state) => state.bookingProcess.bikes

//Retorna una lista donde cada elemento es una bici sin la propiedad quantity
export const selectBikesByUnits = (state) => {
   const bikes = state.bookingProcess.bikes
   const items = bikes.map((bike) => {
      //Retorna un  <SelectedBikesListItem> por cada unidad stored del mismo id+size
      const multipleItem = []
      let n = 1
      const { quantity } = bike
      while (n <= quantity) {
         multipleItem.push(bike)
         n++
      }
      return multipleItem
   })

   return items.flat()
}

export const selectBookingDayPrice = (state) => {
   //TODO: resolver mejor qua aquí pillas de otro slice
   const { segmentList } = state.databaseInfo
   const bikeList = selectBikesByUnits(state)
   const dayPrice = bikeList.reduce((acc, bike) => {
      const { type, range } = bike
      const [{ price }] = segmentList.filter(
         (segment) => segment.type === type && segment.range === range
      )
      return acc + price
   }, 0)
   return dayPrice
}

export const selectBookingDuration = (state) => {
   const { from, to } = selectDateRange(state)

   const duration = differenceInDays(to, from)
   return duration
}

export const selectBookingPrice = (state) =>
   selectBookingDayPrice(state) * selectBookingDuration(state)

//Datos necesarios para POST crear reserva
export const selectBookingData = (state) => {
   const { from, to } = selectIsoStringDateRange(state)
   const bikes = selectBikesByUnits.map((bike) => ({
      id: bike.id,
      size: bike.size,
   }))
   const { name, surname, address, phone, mail, homeDelivery, homePickup } =
      selectUser(state)
   const duration = selectBookingDuration(state)
   price = selectBookingPrice(state)
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
/**LISTENERS */

const dateListener = (action, listenerApi) => {
   console.log('*************', action.payload)
   // listenerApi.cancelActiveListeners()
}
