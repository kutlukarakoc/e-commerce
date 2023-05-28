import { Link } from 'react-router-dom'
import { useState, useEffect, FormEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import { UserIcon, HeartIcon, ShoppingBagIcon, Bars3Icon, MagnifyingGlassIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import Input from '../ui/input'
import MobileMenu from './MobileMenu'
import logo from '../../assets/logo.png'
import { categories } from '../../constants/header/headerConstants'

interface IRightSideItems {
   icon: JSX.Element
   text: string
   path: string
}

const Header: React.FC = () => {
   // toggle state for mobile menu
   const [toggleMenu, setToggleMenu] = useState<boolean>(false)
   // CSS transform value for mobile menu animation
   const [menuTransform, setMenuTransform] = useState<string>('translateX(-256px)')
   // input value state for search
   const [inputValue, setInputValue] = useState<string>('')

   // get user from the redux store
   const user = useAppSelector(state => state.auth.user)

   // hook for navigation and location data
   const navigate = useNavigate()
   const { pathname, search } = useLocation()

   // update the menu transform based on the toggle state
   useEffect(() => {
      toggleMenu ? setMenuTransform('translateX(0)') : setMenuTransform('translateX(-256px)')
   }, [toggleMenu])

   // handle input value and search-related changes
   useEffect(() => {
      if (pathname.includes('search-results')) {
         setInputValue(search.split('=')[1])
      } else {
         setInputValue('')
      }
      // reset the input value when the effect is cleaned up
      return () => setInputValue('')
   }, [search, pathname])

   // form submission for search
   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const value = new FormData(event.currentTarget).get('head-search')
      if (value) {
         navigate(`/search-results?search=${value}`)
      }
   }

   // right-side items with their icons, text, and paths for logged in status
   const rightSideItems: IRightSideItems[] = [
      { icon: <UserIcon className='h-7 w-7 text-gray-700' />, text: 'Profile', path: '/profile' },
      { icon: <HeartIcon className='h-7 w-7 text-gray-700' />, text: 'Favorites', path: '/favorites' },
      { icon: <ShoppingBagIcon className='h-7 w-7 text-gray-700' />, text: 'Cart', path: '/cart' },
   ]

   return (
      <>
         {/* Header */}
         <header className='h-32 shadow-md text-gray-700'>
            {/* Navigation */}
            <nav className='flex justify-between items-center h-20 pl-4 pr-5 border-solid border-b border-gray-500'>
               {/* Mobile Menu */}
               <div className='block sm:hidden cursor-pointer' onClick={() => setToggleMenu(prev => !prev)}>
                  <Bars3Icon className='h-7 w-7 text-gray-700' />
               </div>
               {/* Logo */}
               <Link to='/' className='order-1 sm:order-2 cursor-pointer w-14 h-12'>
                  <img src={logo} alt='ecommerce' className='w-full h-full block' />
               </Link>
               {/* Search */}
               <form className='hidden sm:block order-2 max-w-xs w-full relative' onSubmit={handleSubmit}>
                  <Input type='text' name='head-search' placeholder='Search products' value={inputValue} autoComplete='off' pattern='.+' required onChange={e => setInputValue(e.target.value)} />
                  <button type='submit' className='absolute right-3 top-1/2 -translate-y-1/2'>
                     <MagnifyingGlassIcon className='w-5 h-5' />
                  </button>
               </form>
               {/* Right-side Items */}
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
            </nav>
            {/* Category Links */}
            <div className='flex justify-center items-center gap-6 h-14 pb-2'>
               {categories.map((category, index) => (
                  <Link key={index} to={category.path} className='hidden sm:block text-gray-800'>{category.title}</Link>
               ))}
               {/* Mobile Search */}
               <form className='block sm:hidden w-11/12 mx-auto relative' onSubmit={handleSubmit}>
                  <Input type='text' name='head-search' placeholder='Search products' value={inputValue} autoComplete='off' pattern='.+' required onChange={e => setInputValue(e.target.value)} />
                  <button type='submit' className='absolute right-3 top-1/2 -translate-y-1/2'>
                     <MagnifyingGlassIcon className='w-5 h-5' />
                  </button>
               </form>
            </div>
         </header>

         {/* Mobile Menu */}
         {toggleMenu && <MobileMenu categories={categories} menuTransform={menuTransform} />}
      </>
   )
}

export default Header