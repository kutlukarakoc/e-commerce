import { IProduct } from '../../types/productsTypes'
import { Link } from 'react-router-dom'
import Button from '../ui/button'
import Favorite from '../ui/favorite'
import { HeartIcon } from '@heroicons/react/24/outline'

interface IProductCard {
   products: IProduct[]
}

const ProductCard: React.FC<IProductCard> = ({ products }) => {

   return (
      <>
         {products.map(product => (
            <div key={product.id} className='group bg-zinc-50 h-[525px] p-10 relative rounded'>
               <Favorite product={product} className='absolute z-10 top-2 right-3 w-7' />
               <Link to={`/products/${product.id}`} className='cursor-pointer'>
                  <img src={product.image} alt='ecommerce' className='w-full block aspect-video max-w-[250px] max-h-[275px] h-full mx-auto mix-blend-multiply' />
               </Link>
               <Link to={`/products/${product.id}`} className='cursor-pointer'>
                  <h3 className='mt-10 mb-1 text-base text-left font-semibold h-6 line-clamp-1 overflow-hidden'>{product.title}</h3>
               </Link>
               <p className='text-sm mb-3'>{product.category}</p>
               <div className='font-semibold text-left items-center mb-6'>${product.price.toFixed(2)}</div>
               <Button type='button' variant='filled' color='indigo' size='md' className='w-full h-11'>
                  Add to cart
               </Button>
            </div>
         ))}
      </>
   )
}

export default ProductCard