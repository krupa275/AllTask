import { configureStore } from '@reduxjs/toolkit'
import authSlice from './src/redux/slice'
import productSlice from './src/redux/productSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
  },
})