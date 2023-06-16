import Filter from './filter'
import Products from './products'
import { useAppSelector } from '../../store/hooks'

const ProductListing: React.FC = () => {

   // getting filtered products, loading and error states from redux store
   const { filteredProducts, loading, error } = useAppSelector(state => state.filterProducts)

   return (
      <section className='container mx-auto my-32'>
         <Filter error={error} />
         <Products filteredProducts={filteredProducts} loading={loading} error={error} />
      </section>
   )
}

export default ProductListing