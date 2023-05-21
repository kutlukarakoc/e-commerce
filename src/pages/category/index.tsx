import Filter from './filter'
import Products from './products'

const ProductListing: React.FC = () => {
   return (
      <section className='container mx-auto my-32 flex gap-20'>
         <Filter />
         <Products />
      </section>
   )
}

export default ProductListing