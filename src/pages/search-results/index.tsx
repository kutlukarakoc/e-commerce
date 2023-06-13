import ProductCard from '../../components/product-card'
import LoadingSkeleton from '../../components/product-card/loading'
import NotFound from '../../components/not-found'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { fetchProductsBySearch, clearSearchProducts } from '../../store/features/searchProducts'

const SearchResults: React.FC = () => {
   // getting current URL search parameters
   const { search } = useLocation()

   const dispatch = useAppDispatch()
   // getting searched products, loading state, and error state from the redux store
   const { searchedProducts, loading, error } = useAppSelector(state => state.searchProducts)

   // fetches products based on the search key from the URL
   useEffect(() => {
      // extracts the search key from the URL search parameters
      const key = search.split('=')[1]
      if (key.length) dispatch(fetchProductsBySearch(key))

      // clear search product state when component unmount
      return () => {
         dispatch(clearSearchProducts())
      }
   }, [search])

   // display not found error
   if (error) {
      return <NotFound title='Something went wrong.' text='Please try again later.' link='/products' linkText='See products' />
   }

   // display not found product component when there is no error, false loading and no product in searched products state
   if (!error && !loading && !searchedProducts.length) {
      return <div className='my-20'><NotFound title='Product not found' text='Sorry, we couldn’t find the product you’re looking for.' isErrorCode={false} link='/products' linkText='See products' /></div>
   }

   return (
      <div className='container mx-auto my-32'>
         <div className='flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            { // if loading is true display loading skeleton, else display products
               loading
                  ? <LoadingSkeleton count={3} hasIcon={true} loading={loading} />
                  : <ProductCard products={searchedProducts} icon='favorite' />
            }
         </div>
      </div>
   )
}

export default SearchResults
