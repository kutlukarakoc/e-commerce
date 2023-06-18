import ProductCard from '../../components/product-card'
import LoadingSkeleton from '../../components/product-card/loading'
import NotFound from '../../components/not-found'
import Title from '../../components/title'
import TitleLoading from '../../components/title/loading'
import Divider from '../../components/ui/divider'
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
      <section className='container mx-auto my-20 px-4 sm:px-0'>
         {
            loading
               ? <TitleLoading />
               : <Title cypressAttr='wishlist-title' className='sm:text-left'>{searchedProducts.length} Products found</Title>
         }
         <Divider variant='soft' />
         <div className='flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {
               loading
                  ? <LoadingSkeleton count={3} hasIcon={true} loading={loading} />
                  : <ProductCard products={searchedProducts} icon='favorite' />
            }
         </div>
      </section>
   )
}

export default SearchResults
