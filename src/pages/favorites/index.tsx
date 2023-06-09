import WishlistProducts from './products'
import Divider from '../../components/ui/divider'
import LoadingSkeleton from './loading'
import NotFound from '../../components/not-found'
import { useWishlist } from '../../hooks/useWishlist'
import { useAppSelector } from '../../store/hooks'

const Favorites = () => {
   // getting wishlist from redux store
   const { wishlist } = useAppSelector(state => state.wishlist)
   // manage wishlist with custom hook
   const { wishlistLoading, wishlistError } = useWishlist()

   if(wishlistError) {
      return <NotFound title='Something went wrong.' text='We are currently unable to view your wishlist. Please try again later.' link='/' linkText='Go back home'  />
   }

   if (wishlistLoading) {
      return <LoadingSkeleton />
   }

   return (
      <div className='container mx-auto my-20 flex-1'>
         <h1 className='text-3xl font-semibold'>My Wishlist ({wishlist.length} products)</h1>
         <Divider variant='soft' />
         <WishlistProducts />
      </div>
   )
}

export default Favorites