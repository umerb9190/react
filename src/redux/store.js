import { configureStore } from '@reduxjs/toolkit'
import blogReducer from "./slices/blogs"
import authReducer from "./slices/auth"

export const store = configureStore({
  reducer: {
    blogs:blogReducer,
    auth:authReducer
  },
})