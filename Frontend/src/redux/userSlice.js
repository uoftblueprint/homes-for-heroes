import { createSlice } from '@reduxjs/toolkit';

// toggle SET_EXPIRY to set expiry date to redux
const SET_EXPIRY = true;
const EXPIRY_DATE = 1;

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: null,
    password: null,
    loggedIn: false,
    timeout: null,
  },
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.loggedIn = true;
      if (SET_EXPIRY) {
        state.timeout = new Date();
        state.timeout.setDate(state.timeout.getDate() + EXPIRY_DATE);
      }
    },
    logout: (state) => {
      state.email = null;
      state.password = null;
      state.loggedIn = false;
      state.timeout = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export const selectTimeout = (state) => state.user.timeout;
export const selectLoggedIn = (state) => state.user.loggedIn;

export default userSlice.reducer;
