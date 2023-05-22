import { configureStore } from '@reduxjs/toolkit'
import multipleProducts from './features/multipleProducts'
import singleProduct from './features/singleProduct'
import filterProducts from './features/filterProducts'


export const store = configureStore({
   reducer: {
      product: singleProduct,
      products: multipleProducts,
      filterProducts,
   }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch