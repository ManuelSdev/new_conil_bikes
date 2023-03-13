import { createSlice, current } from '@reduxjs/toolkit'
import { format } from 'date-fns'

const initialState = {
   addButton: true,
   formIsActive: true,
   dateError: '',

   size: '',
   type: '',
   range: '',

   date: {},
   datex: [],
   bikes: [],
   name: '',
   address: '',
   phone: '',
   mail: '',
   homeDelivery: false,
   homePickup: false,
   test: 0,
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

      dateSelected: (state, action) => {
         const [picker, value] = action.payload
         state.date = { ...state.date, [picker]: value }
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
      setSize: (state, action) => {
         state.size = action.payload
      },

      sizeSelected: (state, action) => {
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

      deleteBike: (state, action) => {
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

      testAction: (state, action) => {
         state.test = action.payload
      },
   },
})

export const {
   testAction,
   setFormIsActive,
   setAddButton,
   setDate,
   dateSelected,
   dateErrorChanged,
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

/**SELECTORS */
export const selectDate = (state) => {
   const isoStringDate = state.bookingForm.date

   const date = {
      from: isoStringDate.from ? new Date(isoStringDate.from) : null,
      to: isoStringDate.to ? new Date(isoStringDate.to) : null,
   }
   //console.log(date)
   return date
}
export const selectIsoStringDate = (state) => state.bookingForm.date
export const selectBookingDuration = (state) => {
   const { from, to } = state.bookingForm.date
   return differenceInDays(to, from)
}
export const selectDateError = (state) => state.bookingForm.dateError

export const selectSize = (state) => state.bookingForm.size

/**LISTENERS */
