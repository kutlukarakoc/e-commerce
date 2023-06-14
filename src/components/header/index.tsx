import RightSide from './rightSide'
import Input from '../ui/input'
import MobileMenu from './MobileMenu'
import logo from '../../assets/logo.png'
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useState, useEffect, FormEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { categories } from '../../constants/header/headerConstants'

const Header: React.FC = () => {
   // toggle state for mobile menu
   const [toggleMenu, setToggleMenu] = useState<boolean>(false)
   // CSS transform value for mobile menu animation
   const [menuTransform, setMenuTransform] = useState<string>('translateX(-256px)')
   // input value state for search
   const [inputValue, setInputValue] = useState<string>('')

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
      // reset the input value and close mobile menu when the effect is cleaned up
      return () => {
         setInputValue('')
         setToggleMenu(false)
      }
   }, [search, pathname])

   // form submission for search
   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const value = new FormData(event.currentTarget).get('head-search') || new FormData(event.currentTarget).get('head-search-mb')
      if (value) {
         navigate(`/search-results?search=${value}`)
      }
   }

   return (
      <>
         {/* Header */}
         <header className='h-32 shadow-md text-gray-700'>
            {/* Navigation */}
            <nav className='flex justify-between items-center h-20 pl-4 pr-5 border-solid border-b border-gray-500'>
               {/* Mobile Menu */}
               <div data-cy='menu-button' className='block sm:hidden cursor-pointer' onClick={() => setToggleMenu(prev => !prev)}>
                  <Bars3Icon className='h-7 w-7 text-gray-700' />
               </div>
               {/* Logo */}
               <Link to='/' className='order-1 sm:order-2 cursor-pointer w-14 h-12'>
                  <img src={logo} alt='ecommerce' className='w-full h-full block' />
               </Link>
               {/* Search */}
               <form data-cy='header-search-form' className='hidden sm:block order-2 max-w-xs w-full relative' onSubmit={handleSubmit}>
                  <Input data-cy='head-search' type='text' name='head-search' placeholder='Search products' value={inputValue} autoComplete='off' pattern='.+' required onChange={e => setInputValue(e.target.value)} />
                  <button type='submit' className='absolute right-3 top-1/2 -translate-y-1/2'>
                     <MagnifyingGlassIcon className='w-5 h-5' />
                  </button>
               </form>
               {/* Right-side Items */}
               <RightSide />
            </nav>
            {/* Category Links */}
            <div className='flex justify-center items-center gap-6 h-14 pb-2'>
               {categories.map((category, index) => (
                  <Link data-cy='header-category' key={index} to={category.path} className='hidden sm:block text-gray-800'>{category.title}</Link>
               ))}
               {/* Mobile Search */}
               <form data-cy='header-search-form-mb' className='block sm:hidden w-11/12 mx-auto relative' onSubmit={handleSubmit}>
                  <Input type='text' name='head-search-mb' placeholder='Search products' value={inputValue} autoComplete='off' pattern='.+' required onChange={e => setInputValue(e.target.value)} />
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