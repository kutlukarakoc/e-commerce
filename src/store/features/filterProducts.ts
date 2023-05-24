import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IProduct } from '../../types/productsTypes'
import axios from 'axios'

export const fetchProductsByUrl = createAsyncThunk(
   'sortedProducts/byKey',
   async (url: string) => {
      const [path, search] = url.split('?')
      if (!search) {
         return (await axios.get(`https://fakestoreapi.com${url}`)).data
      }
      if (search === 'sort=desc' || search === 'sort=asc') {
         return (await axios.get(`https://fakestoreapi.com${url}`)).data
      } else {
         const response = await axios.get(`https://fakestoreapi.com${path}`)
         let sortBy: string = ''
         let sortOrder: string = ''

         if (search.includes('sort=lower-to-higher-price')) {
            sortBy = 'price'
            sortOrder = 'asc'
         } else if (search.includes('sort=higher-to-lower-price')) {
            sortBy = 'price'
            sortOrder = 'desc'
         } else if (search.includes('lower-to-higher-price')) {
            sortBy = 'rate'
            sortOrder = 'asc'
         } else {
            sortBy = 'rate'
            sortOrder = 'desc'
         }

         const sortedProducts = sortProductsByOrder(response.data, sortBy, sortOrder)
         return sortedProducts
      }
   }
)


const sortProductsByOrder = (products: IProduct[], sortBy: string, sortOrder: string) => {
   return products.slice().sort((a, b) => {
      if (sortBy === 'price') {
         if (sortOrder === 'desc') {
            return b.price - a.price
         } else {
            return a.price - b.price
         }
      } else if (sortBy === 'rate') {
         if (sortOrder === 'desc') {
            return b.rating.rate - a.rating.rate
         } else {
            return a.rating.rate - b.rating.rate
         }
      }
      return 0
   })
}


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
   name: 'filterProducts',
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