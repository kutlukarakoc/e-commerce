import Categories from './categories'
import { Link } from 'react-router-dom'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { logout } from '../../store/features/auth'
import { useNavigate } from 'react-router-dom'

const MobileMenu: React.FC<{ menuTransform: string }> = ({ menuTransform }) => {

   const navigate = useNavigate()
   const dispatch = useAppDispatch()

   // get user from the redux store
   const { user } = useAppSelector(state => state.auth)

   // execute logout with dispatch and navigate to home page
   const handleLogout = () => {
      dispatch(logout())
      navigate('/')
   }

   return (
      <div
         data-cy='mobile-menu'
         className="absolute z-10 w-52 h-60 shadow-lg bg-white top-20 left-0 flex flex-col justify-between items-start p-6 transition-transform"
         style={{ transform: menuTransform }}
      >
         <div className="flex flex-col justify-center items-start gap-3 text-sm">
            <Categories />
         </div>
         <div className='border-solid border-t border-gray-500 w-full'></div>
         <div className='w-full'>
            <div data-cy='mobile-menu-footer' className='flex items-center gap-2 cursor-pointer'>
               {user?.uid
                  ? (
                     <div className='flex items-center gap-2 text-sm' onClick={handleLogout}>
                        <ArrowRightOnRectangleIcon className='h-5 w-5 text-gray-700' /> Logout
                     </div>
                  ) : (
                     <Link to='/auth' className='flex items-center justify-center gap-2 cursor-pointer text-sm'>
                        <ArrowRightOnRectangleIcon className='h-5 w-5 text-gray-700' /> Login/Register
                     </Link>
                  )
               }
            </div>
         </div>
      </div>
   )
}

export default MobileMenu