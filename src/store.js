import { configureStore } from '@reduxjs/toolkit'
import textsReducer from './basico/TextsSlice.js'

export default configureStore({
  reducer: {
    texts: textsReducer,
  },
})