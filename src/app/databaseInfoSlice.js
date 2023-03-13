import { createSlice, current } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
   bikeSizeList: [],
   typeList: [],
   rangeList: [],
   segmentList: [],
}

export const databaseInfoSlice = createSlice({
   name: 'databaseInfo',
   initialState,
   reducers: {
      setDatabaseInfo: (state, action) => {
         //console.log('SET', action.payload)
         return (state = { ...state, ...action.payload })
      },
   },
   extraReducers: {
      [HYDRATE]: (state, action) => {
         //console.log('HYDRATE', action.payload.databaseInfo)
         return (state = {
            ...state,
            ...action.payload.databaseInfo,
         })
      },
   },
})

export const { setDatabaseInfo } = databaseInfoSlice.actions

export default databaseInfoSlice.reducer
