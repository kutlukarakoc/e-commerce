import ProductCard from '../../components/product-card'
import Divider from '../../components/ui/divider'
import Title from '../../components/title'
import TitleLoading from '../../components/title/loading'
import LoadingSkeleton from '../../components/product-card/loading'
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

   if(!wishlist.length) {
      return <NotFound title='Your wihslist is empty.' link='/products' linkText='See products' isErrorCode={false} />
   }

   return (
      <div className='container mx-auto my-20 flex-1 px-4 sm:px-0'>
         {
            wishlistLoading
               ? <TitleLoading />
               : <Title cypressAttr='wishlist-title' className='sm:text-left'>My Wishlist ({wishlist.length} products)</Title>
         }

         <Divider variant='soft' />
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {
               wishlistLoading
                  ? <LoadingSkeleton count={3} hasIcon={true} loading={wishlistLoading} />
                  : <ProductCard products={wishlist} icon='trash' />
            }
         </div>
      </div>
   )
}

export default Favorites