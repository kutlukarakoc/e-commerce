import Filter from './filter'
import Products from './products'
import Title from '../../components/title'
import TitleLoading from '../../components/title/loading'
import Divider from '../../components/ui/divider'
import { useAppSelector } from '../../store/hooks'

const ProductListing: React.FC = () => {

   // getting filtered products, loading and error states from redux store
   const { filteredProducts, loading, error } = useAppSelector(state => state.filterProducts)

   return (
      <section className='container mx-auto my-20 px-4 sm:px-0'>
         {
            loading
               ? <TitleLoading />
               : <Title cypressAttr='wishlist-title' className='sm:text-left'>Showing {filteredProducts.length} products</Title>
         }

         <Divider variant='soft' />
         <Filter error={error} />
         <Products filteredProducts={filteredProducts} loading={loading} error={error} />
      </section>
   )
}

export default ProductListing