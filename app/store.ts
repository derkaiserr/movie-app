import { configureStore } from '@reduxjs/toolkit'
import UserSlice from '../features/User/UserSlice'
import getDataSlice from '../features/GetData/getDataSlice'
export const store = configureStore({
  reducer: {
   UserSlice: UserSlice,
   getDataSlice: getDataSlice
  },
})