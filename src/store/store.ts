import { configureStore } from '@reduxjs/toolkit'
import multipleProducts from './features/multipleProducts'
import singleProduct from './features/singleProduct'
import filterProducts from './features/filterProducts'
import searchProducts from './features/searchProducts'
import auth from './features/auth'
import wishlistSlice from './features/wishlist'

export const store = configureStore({
   reducer: {
      product: singleProduct,
      products: multipleProducts,
      filterProducts,
      searchProducts,
      auth,
      wishlist: wishlistSlice
   }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch