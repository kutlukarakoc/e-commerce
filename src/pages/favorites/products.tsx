import AddToCart from '../../components/add-to-cart'
import { Link } from 'react-router-dom'
import { useWishlist } from '../../hooks/useWishlist'
import { useAppSelector } from '../../store/hooks'
import { IProduct } from '../../types/productsTypes'
import { TrashIcon } from '@heroicons/react/24/outline'

const WishlistProducts: React.FC = () => {

   // getting wishlist from redux store
   const { wishlist } = useAppSelector(state => state.wishlist)
   // manage wishlist with custom hook
   const { handleWishlist } = useWishlist()

   // remove product from wishlist
   const handleFavorite = async (product: IProduct) => {
      await handleWishlist(product, 'delete')
   }

   return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
         {wishlist.map((product: IProduct) => (
            <div key={product.id} className='bg-zinc-50 h-[525px] p-8 relative rounded-md'>
               <div className='absolute top-2 right-2 cursor-pointer' onClick={() => handleFavorite(product)}>
                  <TrashIcon className='w-6 h-6' />
               </div>
               <Link to={`/products/${product.id}`}>
                  <img src={product.image} alt='ecommerce' className='w-full block aspect-video max-w-[250px] max-h-[275px] h-full mx-auto mix-blend-multiply' />
               </Link>
               <Link to={`/products/${product.id}`} className='mt-10 mb-1 text-base text-left font-semibold h-6 line-clamp-1 overflow-hidden'>{product.title}</Link>
               <p className='text-sm mb-3'>{product.category}</p>
               <div className='font-semibold text-left mb-6'>${product.price.toFixed(2)}</div>
               <AddToCart product={product} isFull />
            </div>
         ))}
      </div>
   )
}

export default WishlistProducts