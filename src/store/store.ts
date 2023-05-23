import { configureStore } from '@reduxjs/toolkit'
import multipleProducts from './features/multipleProducts'
import singleProduct from './features/singleProduct'
import filterProducts from './features/filterProducts'
import searchProducts from './features/searchProducts'


export const store = configureStore({
   reducer: {
      product: singleProduct,
      products: multipleProducts,
      filterProducts,
      searchProducts
   }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch