import { configureStore } from '@reduxjs/toolkit'
import blogReducer from "./slices/blogs"

export const store = configureStore({
  reducer: {
    blogs:blogReducer
  },
})