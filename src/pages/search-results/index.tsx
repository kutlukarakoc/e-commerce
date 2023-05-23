import ProductCard from '../../components/product/card'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchProductsBySearch } from '../../store/features/searchProducts'

const SearchResults: React.FC = () => {

   const { search } = useLocation()
   const navigate = useNavigate()

   const dispatch = useAppDispatch()
   const { searchedProducts, loading, error } = useAppSelector(state => state.searchProducts)

   useEffect(() => {
      const key = search.split('=')[1] || ''
      key ? dispatch(fetchProductsBySearch(key)) : navigate('/')
      
   }, [search])

   

   return (
      <div className='container mx-auto my-32'>
         <div className='flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            <ProductCard products={searchedProducts} />
         </div>
      </div>
   )
}

export default SearchResults