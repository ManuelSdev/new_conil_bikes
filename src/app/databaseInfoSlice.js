import { createSelector, createSlice, current } from '@reduxjs/toolkit'
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
      databaseInfoLoaded: (state, action) => {
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

export const { databaseInfoLoaded } = databaseInfoSlice.actions

export default databaseInfoSlice.reducer

const selectDatabaseInfo = (state) => state.databaseInfo

export const selectDatabaseInfoSegmentList = createSelector(
   [selectDatabaseInfo],
   (databaseInfo) =>
      console.log('---------', databaseInfo.segmentList) ||
      databaseInfo.segmentList
)
