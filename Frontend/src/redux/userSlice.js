import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user_id: null,
    email: null,
    password: null,
    loggedIn: false,
    timeout: null,
    role_id: null,
  },
  reducers: {
    login: (state, action) => {
      state.user_id = action.payload.user_id;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.loggedIn = true;
      state.timeout = action.payload.timeout;
      state.role_id = action.payload.role_id;
    },
    logout: (state) => {
      state.id = null;
      state.email = null;
      state.password = null;
      state.loggedIn = false;
      state.timeout = null;
      state.role_id = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user;

export const selectTimeout = (state) => state.user.timeout;
export const selectLoggedIn = (state) => state.user.loggedIn;
export const selectRoleId = (state) => state.user.role_id;
export const selectUserId = (state) => state.user.user_id;

export default userSlice.reducer;
