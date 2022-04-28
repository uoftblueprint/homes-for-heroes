import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
   name: "user",
   initialState: {
      email: null,
      password: null,
      loggedIn: false,
   },
   reducers: {
      login: (state, action) => {
         state.email = action.payload.email
         state.password = action.payload.password
         state.loggedIn = true
      },
      logout: (state) => {
         state.email = null
         state.password = null
         state.loggedIn = false
      },
   },
});

export const {login, logout} = userSlice.actions;

export const selectUser = state => state.user.user;

export default userSlice.reducer;