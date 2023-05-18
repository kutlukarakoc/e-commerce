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

export const fetchProductById = createAsyncThunk(
   'product/byId',
   async (id: number) => {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
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

export const fetchSortedProducts = createAsyncThunk(
   'sortedProducts/byKey',
   async (keyword: string) => {
      const response = await axios.get(`https://fakestoreapi.com/products?sort=${keyword}`)
      return response.data
   }
)

interface ProductsProps {
   product: IProduct | null
   loading: boolean
   error: string | null
}

const initialState: ProductsProps = {
   product: null,
   loading: false,
   error: null
}

const productsSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchAllProducts.pending, (state) => {
         state.loading = true
      })
      builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
         state.loading = false
         state.product = action.payload
         state.error = null
      })
      builder.addCase(fetchAllProducts.rejected, (state) => {
         state.loading = false
         state.error = 'Something went wrong. Please try again later.'
      })

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

      builder.addCase(fetchLimitedProducts.pending, (state) => {
         state.loading = true
      })
      builder.addCase(fetchLimitedProducts.fulfilled, (state, action) => {
         state.loading = false
         state.product = action.payload
         state.error = null
      })
      builder.addCase(fetchLimitedProducts.rejected, (state) => {
         state.loading = false
         state.error = 'Something went wrong. Please try again later.'
      })

      builder.addCase(fetchSortedProducts.pending, (state) => {
         state.loading = true
      })
      builder.addCase(fetchSortedProducts.fulfilled, (state, action) => {
         state.loading = false
         state.product = action.payload
         state.error = null
      })
      builder.addCase(fetchSortedProducts.rejected, (state) => {
         state.loading = false
         state.error = 'Something went wrong. Please try again later.'
      })
   }
})

export const products = (state: RootState) => state.products
export default productsSlice.reducer