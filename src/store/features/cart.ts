import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { ICart } from '../../types/cartTypes'
import { PayloadAction } from '@reduxjs/toolkit'

interface IUserCart {
   cart: ICart[]
}

const initialState: IUserCart = {
   cart: []
}

const userCart = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      manageCart: (state, action: PayloadAction<ICart[]>) => {
         state.cart = action.payload
      }
   }
})

export const { manageCart } = userCart.actions
export const cartItems = (state: RootState) => state.cart.cart
export default userCart.reducer
