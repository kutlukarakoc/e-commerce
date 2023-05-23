import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IProduct } from '../../types/productsTypes'
import axios from 'axios'

export const searchProductsByKey = createAsyncThunk(
   'sortedProducts/byKey',
   async (key: string) => {
      const response = await axios.get('https://fakestoreapi.com/products')
      const filteredProducts = response.data.filter((product: IProduct) => product.title.includes(key))
      return filteredProducts
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
      builder.addCase(searchProductsByKey.pending, (state) => {
         state.loading = true
      })
      builder.addCase(searchProductsByKey.fulfilled, (state, action) => {
         state.loading = false
         state.searchedProducts = action.payload
         state.error = null
      })
      builder.addCase(searchProductsByKey.rejected, (state) => {
         state.loading = false
         state.error = 'Something went wrong. Please try again later.'
      })
   }
})

export const products = (state: RootState) => state.products
export default searchProducts.reducer