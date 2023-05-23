import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IProduct } from '../../types/productsTypes'
import axios from 'axios'

export const fetchProductsBySearch = createAsyncThunk(
   'sortedProducts/byKey',
   async (key: string) => {
      const response = await axios.get('https://fakestoreapi.com/products')
      return response.data.filter((product: IProduct) => product.title.toLowerCase().includes(key.toLowerCase()))
   }
)

interface ProductsProps {
   searchedProducts: IProduct[]
   loading: boolean
   error: string | null
}

const initialState: ProductsProps = {
   searchedProducts: [],
   loading: false,
   error: null
}

const searchProducts = createSlice({
   name: 'products',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchProductsBySearch.pending, (state) => {
         state.loading = true
      })
      builder.addCase(fetchProductsBySearch.fulfilled, (state, action) => {
         state.loading = false
         state.searchedProducts = action.payload
         state.error = null
      })
      builder.addCase(fetchProductsBySearch.rejected, (state) => {
         state.loading = false
         state.error = 'Something went wrong. Please try again later.'
      })
   }
})

export const products = (state: RootState) => state.products
export default searchProducts.reducer