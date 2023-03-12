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
      /*
      increaseBikeQuantity: (state, action) => {
         const { id, size } = action.payload
         state.bikes = state.bikes.map((bike) => {
            if (bike.size === size && bike.id === id) {
               return { ...bike, quantity: bike.quantity + 1 }
            } else return bike
         })
      },
      decreaseBikeQuantity: (state, action) => {
         state.bikes.push(action.payload)
      },
      syncBikeWithDb: (state, action) => {
         const { id, size, newCount, newQuantity } = action.payload
         state.bikes.push(action.payload)
      },
      */
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
            console.log('only one', onlyOne)
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

         /*
         const start = state.bikes.findIndex(
            (bike) =>
               bike.id === action.payload.id &&
               bike.size === action.payload.size
         )
         state.bikes.splice(start, 1)
         */
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
