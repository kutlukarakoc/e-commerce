import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IProduct } from '../../types/productsTypes'
import axios from 'axios'

export const fetchAllProducts = createAsyncThunk(
   'allProducts/get',
   async () => {
      const response = await axios.get('https://fakestoreapi.com/products')
      return response.data
   }
)

export const fetchLimitedProducts = createAsyncThunk(
   'limitedProducts/byLimit',
   async (limit: number) => {
      const response = await axios.get(`https://fakestoreapi.com/products?limit=${limit}`)
      return response.data
   }
)

interface ProductsProps {
   products: IProduct[]
   loading: boolean
   error: string | null
}

const initialState: ProductsProps = {
   products: [],
   loading: false,
   error: null
}

const multipleProducts = createSlice({
   name: 'products',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchAllProducts.pending, (state) => {
         state.loading = true
      })
      builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
         state.loading = false
         state.products = action.payload
         state.error = null
      })
      builder.addCase(fetchAllProducts.rejected, (state) => {
         state.loading = false
         state.error = 'Something went wrong. Please try again later.'
      })

      builder.addCase(fetchLimitedProducts.pending, (state) => {
         state.loading = true
      })
      builder.addCase(fetchLimitedProducts.fulfilled, (state, action) => {
         state.loading = false
         state.products = action.payload
         state.error = null
      })
      builder.addCase(fetchLimitedProducts.rejected, (state) => {
         state.loading = false
         state.error = 'Something went wrong. Please try again later.'
      })
   }
})

export const products = (state: RootState) => state.products
export default multipleProducts.reducer