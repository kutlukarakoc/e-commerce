import ProductCard from '../../components/product/card'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchProductsBySearch } from '../../store/features/searchProducts'
import NotFound from '../../components/not-found'

const SearchResults: React.FC = () => {
   // retrieves the current URL search parameters
   const { search } = useLocation()

   const dispatch = useAppDispatch()
   // retrieves the searched products, loading state, and error state from the Redux store
   const { searchedProducts, loading, error } = useAppSelector(state => state.searchProducts)

   // manages the state of whether the search results are not found
   const [isNotFound, setIsNotFound] = useState<boolean>(false)

   useEffect(() => {
      // extracts the search key from the URL search parameters
      const key = search.split('=')[1]
      if (key.length) {
         dispatch(fetchProductsBySearch(key))
         setIsNotFound(false)
      } else {
         setIsNotFound(true)
      }
   }, [search])

   useEffect(() => {
      // checks if an error occurred or no products were found after the search
      error !== null || (loading === false && !searchedProducts.length) ? setIsNotFound(true) : setIsNotFound(false)
   }, [searchedProducts, loading, error])

   return (
      <div className='container mx-auto my-32'>
         {
            // displays error component or product card component depends on not found state
            isNotFound
               ? <NotFound title='Product not found' text='Sorry, we couldn’t find the product you’re looking for.' link='/' linkText='Go back home' />
               : <div className='flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'><ProductCard products={searchedProducts} /></div>
         }
      </div>
   )
}

export default SearchResults
