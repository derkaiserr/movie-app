import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {}
}

export const getDataSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   getData (state, action) {
    return {
      ...state,
      data: action.payload
    }
   },
  },
})

// Action creators are generated for each case reducer function
export const { getData} =  getDataSlice.actions

export default getDataSlice.reducer