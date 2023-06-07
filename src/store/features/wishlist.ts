import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IProduct } from '../../types/productsTypes'
import { PayloadAction } from '@reduxjs/toolkit'

const initialState: IProduct[] | any = {
   wishlist: []
}

const wishlistSlice = createSlice({
   name: 'wishlist',
   initialState,
   reducers: {
      manageWishlist: (state, action: PayloadAction<IProduct[]>) => {
         state.wishlist = action.payload
      }
   }
})

export const { manageWishlist } = wishlistSlice.actions
export const wishlist = (state: RootState) => state.wishlist
export default wishlistSlice.reducer
