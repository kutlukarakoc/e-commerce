import RightSide from './rightSide'
import MobileMenu from './MobileMenu'
import Categories from './categories'
import Search from './search'
import logo from '../../assets/logo.png'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useState, useEffect, FormEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Header: React.FC = () => {
   // hook for navigation and location data
   const navigate = useNavigate()
   const { pathname, search } = useLocation()

   // toggle state for mobile menu
   const [toggleMenu, setToggleMenu] = useState<boolean>(false)
   // CSS transform value for mobile menu animation
   const [menuTransform, setMenuTransform] = useState<string>('translateX(-256px)')
   // input value state for search
   const [inputValue, setInputValue] = useState<string>('')

   // form submission for search
   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (inputValue) {
         navigate(`/search-results?search=${inputValue}`)
      }
   }

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
      // reset the input value and close mobile menu when component unmount
      return () => {
         setInputValue('')
         setToggleMenu(false)
      }
   }, [search, pathname])

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
               {/* Desktop Search */}
               <Search
                  formClasses='hidden sm:block order-2 max-w-xs w-full'
                  formCypressAttr='header-search-form'
                  inputCypressAttr='head-search'
                  handleSubmit={handleSubmit}
                  setInputValue={setInputValue}
                  inputValue={inputValue}
                  name='head-search'
               />
               {/* Right-side Items */}
               <RightSide />
            </nav>
            {/* Category Links */}
            <div className='flex justify-center items-center gap-6 h-14 pb-2'>
               <Categories cypressAttr='header-category' className='hidden sm:block text-gray-800' />
               {/* Mobile Search */}
               <Search
                  formClasses='block sm:hidden w-11/12 mx-auto'
                  formCypressAttr='header-search-form-mb'
                  inputCypressAttr='head-search-mb'
                  handleSubmit={handleSubmit}
                  setInputValue={setInputValue}
                  inputValue={inputValue}
                  name='head-search-mb'
               />
            </div>
         </header>

         {/* Mobile Menu */}
         {toggleMenu && <MobileMenu menuTransform={menuTransform} />}
      </>
   )
}

export default Header