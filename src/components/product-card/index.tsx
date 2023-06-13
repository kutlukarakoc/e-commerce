import AddToCart from '../add-to-cart'
import Favorite from '../toggle-favorite'
import Trash from '../delete-favorite'
import { IProduct } from '../../types/productsTypes'
import { Link } from 'react-router-dom'

interface IProductCard {
   products: IProduct[]
   icon: 'favorite' | 'trash'
}

const ProductCard: React.FC<IProductCard> = ({ products, icon }) => {

   // render icon depends on icon props
   const renderIcon = (product: IProduct) => {
      if(icon === 'favorite') {
         return <Favorite product={product} wrapperClasses='w-7 h-7 absolute top-2 right-3' />
      } // trash
      return <Trash product={product} />
   }

   return (
      <>
         {products.map(product => (
            <div key={product.id} className='group bg-zinc-50 h-[525px] p-10 relative rounded-md'>
               {renderIcon(product)}
               <Link to={`/products/${product.id}`} className='cursor-pointer'>
                  <img src={product.image} alt='ecommerce' className='w-full block aspect-video max-w-[250px] max-h-[275px] h-full mx-auto mix-blend-multiply' />
               </Link>
               <Link to={`/products/${product.id}`} className='cursor-pointer'>
                  <h3 data-cy='product-card-title' className='mt-10 mb-1 text-base text-left font-semibold h-6 line-clamp-1 overflow-hidden'>{product.title}</h3>
               </Link>
               <p className='text-sm mb-3'>{product.category}</p>
               <div className='font-semibold text-left items-center mb-6'>${product.price.toFixed(2)}</div>
               <AddToCart product={product} isFull />
            </div>
         ))}
      </>
   )
}

export default ProductCard