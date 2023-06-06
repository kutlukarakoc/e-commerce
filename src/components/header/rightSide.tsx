import { Link } from 'react-router-dom'
import { UserIcon, HeartIcon, ShoppingBagIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { setToWishlist } from '../../store/features/wishlist'
import { useWishlist } from '../../hooks/useWishlist'
import { useCart } from '../../hooks/useCart'
import { useEffect } from 'react'

const RightSide: React.FC = () => {

   const dispatch = useAppDispatch()

   // get user from the redux store
   const user = useAppSelector(state => state.auth.user)
   // get wishlist from redux store
   const { wishlistProducts } = useAppSelector(state => state.wishlist)
   // get wishlist from custom hook
   const { wishlist } = useWishlist()
   //get cart from custom hook
   const { cart } = useCart()
   // set initial wishlsit
   useEffect(() => {
      dispatch(setToWishlist(wishlist))
   }, [])

   return (
      <div className='flex justify-center items-center gap-2 sm:gap-6 order-3'>
         {// if user logged in display profile, favorites and cart, else display login/register
            user ? (<>
               <Link to='/profile' className='flex flex-col items-center justify-center gap-1 cursor-pointer w-8 h-8 sm:w-12 sm:h-12'>
                  <UserIcon className='w-full h-full text-gray-700' />
                  <div className='text-xs tracking-wide hidden sm:block'>Profile</div>
               </Link>
               <Link to='/favorites' className='flex flex-col items-center justify-center gap-1 cursor-pointer w-8 h-8 sm:w-12 sm:h-12 relative'>
                  <HeartIcon className='w-full h-full text-gray-700' />
                  <div className='text-xs tracking-wide hidden sm:block'>Wishlist</div>
                  <div className='absolute -right-1 -top-2 bg-indigo-500 rounded-full w-4 h-4 text-center text-white text-xs'>{wishlistProducts.length}</div>
               </Link>
               <Link to='/cart' className='flex flex-col items-center justify-center gap-1 cursor-pointer w-8 h-8 sm:w-12 sm:h-12 relative'>
                  <ShoppingBagIcon className='w-full h-full text-gray-700' />
                  <div className='text-xs tracking-wide hidden sm:block'>Cart</div>
                  <div className='absolute -right-1 -top-2 bg-indigo-500 rounded-full w-4 h-4 text-center text-white text-xs'>{cart.length}</div>
               </Link>
            </>) : (
               <Link to='/auth' className='flex flex-col items-center justify-center gap-1 cursor-pointer'>
                  <ArrowRightOnRectangleIcon className='h-7 w-7 text-gray-700' />
                  <div className='text-xs tracking-wide hidden sm:block'>Login/Register</div>
               </Link>
            )}
      </div>
   )
}

export default RightSide