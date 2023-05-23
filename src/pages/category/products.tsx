import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { fetchProductsByUrl } from '../../store/features/filterProducts'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import ProductCard from './productCard'
import LoadingSkeleton from './loading'

const Products = () => {

   const location = useLocation()
   const dispatch = useAppDispatch()
   const { filteredProducts, loading, error } = useAppSelector(state => state.filterProducts)

   useEffect(() => {
      if (location.search.length) {
         dispatch(fetchProductsByUrl(location.pathname + location.search))
      } else {
         dispatch(fetchProductsByUrl(location.pathname))
      }
   }, [location])

   return (
      <div className='flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
         {!loading && filteredProducts.length ? <ProductCard products={filteredProducts} /> : <LoadingSkeleton /> }
      </div>
   )
}

export default Products 