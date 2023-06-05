import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IProduct } from '../../types/productsTypes'
import { PayloadAction } from '@reduxjs/toolkit'

const initialState: IProduct[] | any = {
   cartItems: []
}

const cart = createSlice({
   name: 'wishlist',
   initialState,
   reducers: {
      setToCart: (state, action: PayloadAction<IProduct[]>) => {
         state.cartItems = action.payload
      }
   }
})

export const { setToCart } = cart.actions
export const cartItems = (state: RootState) => state.cart
export default cart.reducer
