import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IProduct } from '../../types/productsTypes'
import { PayloadAction } from '@reduxjs/toolkit'

const initialState: any = {
   wishlistProducts: []
}

const wishlistSlice = createSlice({
   name: 'wishlist',
   initialState,
   reducers: {
      setToWishlist: (state, action: PayloadAction<IProduct[]>) => {
         state.wishlistProducts = action.payload
      }
   }
})

export const { setToWishlist } = wishlistSlice.actions
export const wishlistProducts = (state: RootState) => state.wishlist
export default wishlistSlice.reducer
