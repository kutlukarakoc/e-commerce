import { Link } from 'react-router-dom'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { logout } from '../../store/features/auth'
import { useNavigate } from 'react-router-dom'

interface CategoriesProps {
   title: string
   path: string
}

const MobileMenu: React.FC<{ categories: CategoriesProps[]; menuTransform: string }> = ({ categories, menuTransform }) => {

   // get user from the redux store
   const { user } = useAppSelector(state => state.auth)

   const navigate = useNavigate()
   const dispatch = useAppDispatch()

   const handleLogout = () => {
      dispatch(logout())
      navigate('/')
   }

   return (
      <div
         className="absolute z-10 w-64 h-72 shadow-lg bg-white top-20 left-0 flex flex-col justify-between items-start p-6 transition-transform"
         style={{ transform: menuTransform }}
      >
         <div className="flex flex-col justify-center items-start gap-4">
            {categories.map((category: CategoriesProps, index: number) => (
               <Link key={index} to={category.path}>{category.title}</Link>
            ))}
         </div>
         <div className='border-solid border-t border-gray-500 w-full'></div>
         <div className='w-full'>
            <div className='flex items-center gap-2 cursor-pointer'>
               {user?.uid
                  ? (<>
                     <ArrowRightOnRectangleIcon className='h-6 w-6 text-gray-5700' onClick={handleLogout} /> Logout
                  </>)
                  : (<Link to='/auth' className='flex items-center justify-center gap-2 cursor-pointer'>
                     <ArrowRightOnRectangleIcon className='h-6 w-6 text-gray-700' />
                     <div className='text-sm tracking-wide'>Login/Register</div>
                  </Link>)}
            </div>
         </div>
      </div>
   )
}

export default MobileMenu