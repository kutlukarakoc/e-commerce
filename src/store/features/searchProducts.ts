import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IProduct } from '../../types/productsTypes'
import axios from 'axios'

export const fetchProductsBySearch = createAsyncThunk(
   'searchedProducts/byKey',
   async (key: string) => {
      const response = await axios.get('https://fakestoreapi.com/products')
      const data = response.data
      const filteredProducts =  data.filter((product: IProduct) => product.title.toLowerCase().includes(key.toLowerCase()))
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
   name: 'searchProducts',
   initialState,
   reducers: {
      clearSearchProducts: (state) => {
         state.searchedProducts = []
         state.loading = false
         state.error = null
      }
   },
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

export const products = (state: RootState) => state.searchProducts
export default searchProducts.reducer
export const { clearSearchProducts } = searchProducts.actions