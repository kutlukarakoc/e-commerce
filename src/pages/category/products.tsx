import ProductCard from '../../components/product-card'
import LoadingSkeleton from '../../components/product-card/loading'
import NotFound from '../../components/not-found'
import { useAppDispatch } from '../../store/hooks'
import { fetchProductsByUrl } from '../../store/features/filterProducts'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { IProduct } from '../../types/productsTypes'

interface IProducts {
   filteredProducts: IProduct[]
   loading: boolean
   error: null | string
}

const Products: React.FC<IProducts> = ({filteredProducts, loading, error}) => {

   const location = useLocation()
   const dispatch = useAppDispatch()

   // fetch products depends on url
   useEffect(() => {
      if (location.search.length) {
         dispatch(fetchProductsByUrl(location.pathname + location.search))
      } else {
         dispatch(fetchProductsByUrl(location.pathname))
      }
   }, [location])

   if(error) {
      return <NotFound title='Something went wrong!' text='Sorry, please try again later.' link='/' linkText='Go back home' />
   }

   return (
      <div className='flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
         {!loading && filteredProducts.length ? <ProductCard products={filteredProducts} icon='favorite' /> : <LoadingSkeleton count={6} hasIcon={true} loading={loading} /> }
      </div>
   )
}

export default Products 