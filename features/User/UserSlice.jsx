import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: null,
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   login (state, action) {
    return {
      ...state,
      user: action.payload
    }
   },
   logout (state, action) {
    return {
      ...state,
      user: null
    }
   }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } =  UserSlice.actions
export const selectUser = ((state)  => state.UserSlice)
export default UserSlice.reducer