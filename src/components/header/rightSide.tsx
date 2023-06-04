import { Link } from 'react-router-dom'
import { UserIcon, HeartIcon, ShoppingBagIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { useAppSelector } from '../../store/hooks'

interface IRightSideItems {
   icon: JSX.Element
   text: string
   path: string
}

const RightSide: React.FC = () => {

   // get user from the redux store
   const user = useAppSelector(state => state.auth.user)

   // right-side items with their icons, text, and paths for logged in status
   const rightSideItems: IRightSideItems[] = [
      { icon: <UserIcon className='h-7 w-7 text-gray-700' />, text: 'Profile', path: '/profile' },
      { icon: <HeartIcon className='h-7 w-7 text-gray-700' />, text: 'Wishlist', path: '/favorites' },
      { icon: <ShoppingBagIcon className='h-7 w-7 text-gray-700' />, text: 'Cart', path: '/cart' },
   ]

   return (
      <div className='flex justify-center items-center gap-2 sm:gap-8 order-3'>
         {// if user logged in display profile, favorites and cart, else display login/register
            user ? rightSideItems.map((item: IRightSideItems, index) => (
               <Link key={index} to={item.path} className='flex flex-col items-center justify-center gap-1 cursor-pointer'>
                  {item.icon}
                  <div className='text-xs tracking-wide hidden sm:block'>{item.text}</div>
               </Link>
            )) : (
               <Link to='/auth' className='flex flex-col items-center justify-center gap-1 cursor-pointer'>
                  <ArrowRightOnRectangleIcon className='h-7 w-7 text-gray-700' />
                  <div className='text-xs tracking-wide hidden sm:block'>Login/Register</div>
               </Link>
            )}
      </div>
   )
}

export default RightSide