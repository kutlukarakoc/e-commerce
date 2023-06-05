import Button from '../../components/ui/button'
import Divider from '../../components/ui/divider'
import LoadingSkeleton from './loading'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useWishlist } from '../../hooks/useWishlist'
import { IProduct } from '../../types/productsTypes'

const Favorites = () => {

   // manage wishlist with custom hook
   const { handleWishlist, wishlist, wishlistLoading } = useWishlist()

   // remove product from wishlist
   const handleClick = async (product: IProduct) => {
      await handleWishlist(product, 'delete')
   }

   if (wishlistLoading) {
      return <LoadingSkeleton />
   }

   return (
      <div className='container mx-auto my-20 flex-1'>
         <h1 className='text-3xl font-semibold'>My Wishlist ({wishlist.length} products)</h1>
         <Divider variant='soft' />
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>

            {wishlist.map((product: IProduct) => (
               <div key={product.id} className='bg-zinc-50 h-[525px] p-8 relative rounded'>
                  <div className='absolute top-2 right-2 cursor-pointer' onClick={() => handleClick(product)}><TrashIcon className='w-6 h-6' /></div>
                  <Link to={`/products/${product.id}`}>
                     <img src={product.image} alt='ecommerce' className='w-full block aspect-video max-w-[250px] max-h-[275px] h-full mx-auto mix-blend-multiply' />
                  </Link>
                  <Link to={`/products/${product.id}`} className='mt-10 mb-1 text-base text-left font-semibold h-6 line-clamp-1 overflow-hidden'>{product.title}</Link>
                  <p className='text-sm mb-3'>{product.category}</p>
                  <div className='font-semibold text-left mb-6'>${product.price.toFixed(2)}</div>
                  <Button variant='filled' color='indigo' size='sm' className='w-full h-11'>Add to cart</Button>
               </div>
            ))}
         </div>
      </div>
   )
}

export default Favorites