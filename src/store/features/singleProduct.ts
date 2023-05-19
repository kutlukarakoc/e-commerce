import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IProduct } from '../../types/productsTypes'
import axios from 'axios'

export const fetchProductById = createAsyncThunk(
   'product/byId',
   async (id: number) => {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
      return response.data
   }
)

interface ProductProps {
   product: IProduct | null
   loading: boolean
   error: string | null
}

const initialState: ProductProps = {
   product: null,
   loading: false,
   error: null
}

const singleProduct = createSlice({
   name: 'singleProduct',
   initialState,
   reducers: {
      clearProduct: (state) => {
         state.product = null
      }
   },
   extraReducers: (builder) => {
      builder.addCase(fetchProductById.pending, (state) => {
         state.loading = true
      })
      builder.addCase(fetchProductById.fulfilled, (state, action) => {
         state.loading = false
         state.product = action.payload
         state.error = null
      })
      builder.addCase(fetchProductById.rejected, (state) => {
         state.loading = false
         state.error = 'Something went wrong. Please try again later.'
      })
   }
})

export const products = (state: RootState) => state.products
export default singleProduct.reducer
export const { clearProduct } = singleProduct.actions