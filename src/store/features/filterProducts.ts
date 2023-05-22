import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IProduct } from '../../types/productsTypes'
import axios from 'axios'

export const fetchProductsByUrl = createAsyncThunk(
   'sortedProducts/byKey',
   async (url: string) => {
      const response = await axios.get(`https://fakestoreapi.com${url}`)
      return response.data
   }
)

interface ProductsProps {
   filteredProducts: IProduct[]
   loading: boolean
   error: string | null
}

const initialState: ProductsProps = {
   filteredProducts: [],
   loading: false,
   error: null
}

const filterProducts = createSlice({
   name: 'products',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchProductsByUrl.pending, (state) => {
         state.loading = true
      })
      builder.addCase(fetchProductsByUrl.fulfilled, (state, action) => {
         state.loading = false
         state.filteredProducts = action.payload
         state.error = null
      })
      builder.addCase(fetchProductsByUrl.rejected, (state) => {
         state.loading = false
         state.error = 'Something went wrong. Please try again later.'
      })
   }
})

export const products = (state: RootState) => state.products
export default filterProducts.reducer