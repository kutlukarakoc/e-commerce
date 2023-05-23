import { Link } from 'react-router-dom'
import { UserIcon, HeartIcon, ShoppingBagIcon, Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Input from '../ui/input'
import MobileMenu from './MobileMenu'
import { useState, useEffect, FormEvent } from 'react'
import logo from '../../assets/logo.png'
import { categories } from '../../constants/header/headerConstants'
import { useNavigate, useLocation } from 'react-router-dom'

interface IRightSideItems {
   icon: JSX.Element
   text: string
}

const Header: React.FC = () => {

   const [toggleMenu, setToggleMenu] = useState<boolean>(false)
   const [menuTransform, setMenuTransform] = useState<string>('translateX(-256px)')
   const [inputValue, setInputValue] = useState<string>('')

   const navigate = useNavigate()
   const { pathname, search } = useLocation()

   useEffect(() => {
      toggleMenu ? setMenuTransform('translateX(0)') : setMenuTransform('translateX(-256px)')
   }, [toggleMenu])

   useEffect(() => {
      if(pathname.includes('search-results')) {
         setInputValue(search.split('=')[1])
      }
   }, [search])

   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const value = new FormData(event.currentTarget).get('head-search')
      if(value){
         navigate(`/search-results?search=${value}`)
      }
   }

   const rightSideItems: IRightSideItems[] = [
      { icon: <UserIcon className='h-7 w-7 text-gray-700' />, text: 'Profile' },
      { icon: <HeartIcon className='h-7 w-7 text-gray-700' />, text: 'Favorites' },
      { icon: <ShoppingBagIcon className='h-7 w-7 text-gray-700' />, text: 'Cart' },
   ]

   return (
      <>
         <header className='h-32 shadow-md text-gray-700'>
            <nav className='flex justify-between items-center h-20 px-4 border-solid border-b border-gray-500'>
               <div className='block sm:hidden cursor-pointer' onClick={() => setToggleMenu(prev => !prev)}>
                  <Bars3Icon className='h-7 w-7 text-gray-700' />
               </div>
               <Link to='/' className='order-1 sm:order-2 cursor-pointer w-14 h-12'>
                  <img src={logo} alt='ecommerce' className='w-full h-full block' />
               </Link>
               <form className='hidden sm:block order-2 max-w-xs w-full relative' onSubmit={handleSubmit}>
                  <Input type='text' name='head-search' placeholder='Search products' defaultValue={inputValue} wrapperStyles='h-9' autoComplete='off' pattern='.+' required />
                  <button type='submit' className='absolute right-3 top-1/2 -translate-y-1/2'>
                     <MagnifyingGlassIcon className='w-5 h-5' />
                  </button>
               </form>
               <div className='flex justify-center items-center gap-2 sm:gap-8 order-3'>
                  {rightSideItems.map((item: IRightSideItems, index) => (
                     <div key={index} className='flex flex-col items-center justify-center gap-1 cursor-pointer'>
                        {item.icon}
                        <div className='text-xs tracking-wide hidden sm:block'>{item.text}</div>
                     </div>
                  ))}
               </div>
            </nav>
            <div className='flex justify-center items-center gap-6 h-14 pb-2'>
               {categories.map((category, index) => (
                  <Link key={index} to={category.path} className='hidden sm:block text-gray-800'>{category.title}</Link>
               ))}
               <form className='block sm:hidden w-11/12 mx-auto relative' onSubmit={handleSubmit}>
                  <Input type='text' name='head-search' placeholder='Search products' defaultValue={inputValue} wrapperStyles='h-9' />
                  <button type='submit' className='absolute right-3 top-1/2 -translate-y-1/2'>
                     <MagnifyingGlassIcon className='w-5 h-5' />
                  </button>
               </form>
            </div>
         </header>

         {toggleMenu && <MobileMenu categories={categories} menuTransform={menuTransform} />}
      </>
   )
}

export default Header