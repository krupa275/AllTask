import { createSlice } from '@reduxjs/toolkit'



export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
  },
  reducers: {

    setLoginData: (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
      state.token = action.payload.accessToken;
      localStorage.setItem("token", action.payload.accessToken);
    },
  },
})

export const { setLoginData } = authSlice.actions

export default authSlice.reducer