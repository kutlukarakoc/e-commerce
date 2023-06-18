import Categories from './categories'
import { Link } from 'react-router-dom'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { logout } from '../../store/features/auth'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'

interface IMobileMenu {
   setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>
   menuTransform: string
}

const MobileMenu: React.FC<IMobileMenu> = ({ menuTransform, setToggleMenu }) => {

   const navigate = useNavigate()
   const dispatch = useAppDispatch()

   // get user from the redux store
   const { user } = useAppSelector(state => state.auth)

   // ref for mobile menu container
   const menuRef = useRef<HTMLDivElement>(null);

   // execute logout with dispatch and navigate to home page
   const handleLogout = () => {
      dispatch(logout())
      navigate('/')
   }

   // close mobile menu when click outside
   const handleClickOutside = (event: TouchEvent | MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
         setToggleMenu(false)
      }
   }

   useEffect(() => {
      // execute for mobile and desktop
      document.addEventListener('click', handleClickOutside)
      document.addEventListener('mousedown', handleClickOutside)

      // remove events when component unmount
      return () => {
         document.removeEventListener('click', handleClickOutside)
         document.removeEventListener('mousedown', handleClickOutside)
      }
   }, [setToggleMenu])

   return (
      <div
         ref={menuRef}
         data-cy='mobile-menu'
         className="absolute z-10 w-52 h-60 shadow-lg bg-white top-20 left-0 flex flex-col justify-between items-start p-6 transition-transform"
         style={{ transform: menuTransform }}
      >
         <div className="flex flex-col justify-center items-start gap-3 text-sm">
            <Categories />
         </div>
         <div className='border-solid border-t border-gray-500 w-full'></div>
         <div className='w-full'>
            <div data-cy='mobile-menu-footer' className='flex items-center gap-2 text-sm'>
               {user?.uid
                  ? (
                     <div className='flex items-center gap-2' onClick={handleLogout}>
                        <ArrowRightOnRectangleIcon className='h-5 w-5 text-gray-700' /> Logout
                     </div>
                  ) : (
                     <Link to='/auth' className='flex items-center gap-2' >
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