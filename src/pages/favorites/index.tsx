import WishlistProducts from './products'
import Divider from '../../components/ui/divider'
import LoadingSkeleton from '../../components/product/loading'
import NotFound from '../../components/not-found'
import { useWishlist } from '../../hooks/useWishlist'
import { useAppSelector } from '../../store/hooks'

const Favorites = () => {
   // getting wishlist from redux store
   const { wishlist } = useAppSelector(state => state.wishlist)
   // manage wishlist with custom hook
   const { wishlistLoading, wishlistError } = useWishlist()

   // display error message when wishlist error is not null
   if (wishlistError) {
      return <NotFound title='Something went wrong.' text='We are currently unable to view your wishlist. Please try again later.' link='/' linkText='Go back home' />
   }

   // display loading skeleton
   if (wishlistLoading) {
      return (
         <div className='container mx-auto my-20 flex-1'>
            <div className='bg-gray-600 w-52 h-3 rounded-lg'></div>
            <Divider />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
               <LoadingSkeleton count={3} hasIcon={true} loading={wishlistLoading} />
            </div>
         </div>
      )
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