import { Link } from 'react-router-dom'
import { UserIcon, HeartIcon, ShoppingBagIcon, Bars3Icon } from '@heroicons/react/24/outline'
import Input from '../ui/input'
import MobileMenu from './MobileMenu'
import { useState, useEffect } from 'react'
import logo from '../../assets/logo.png'
import { categories } from '../../constants/header/headerConstants'

const Header = () => {

   const [toggleMenu, setToggleMenu] = useState<boolean>(false)
   const [menuTransform, setMenuTransform] = useState<string>('translateX(-256px)')

   useEffect(() => {
      toggleMenu ? setMenuTransform('translateX(0)') : setMenuTransform('translateX(-256px)')
   }, [toggleMenu])

   return (
      <>
         <header className='h-32 shadow-md'>
            <nav className='flex justify-between items-center h-20 px-4 border-solid border-b border-slate-500'>
               <div className='block sm:hidden cursor-pointer' onClick={() => setToggleMenu(prev => !prev)}>
                  <Bars3Icon className='h-7 w-7' />
               </div>
               <Link to='/' className='order-1 sm:order-2 cursor-pointer w-14 h-12'>
                  <img src={logo} alt='ecommerce' className='w-full h-full block'/>
               </Link>
               <div className='hidden sm:block order-2 max-w-xs w-full'>
                  <Input type='text' name='head-search' placeholder='search products' className='text-black placeholder:text-black w-full border-b border-black bg-transparent px-2 py-1' />
               </div>
               <div className='flex justify-center items-center gap-2 sm:gap-8 order-3'>
                  <div className='flex flex-col items-center justify-center gap-1 cursor-pointer'>
                     <UserIcon className='h-7 w-7' />
                     <div className='text-xs tracking-wide hidden sm:block'>Profile</div>
                  </div>
                  <div className='flex flex-col items-center justify-center gap-1 cursor-pointer'>
                     <HeartIcon className='h-7 w-7' />
                     <div className='text-xs tracking-wide hidden sm:block'>Favorites</div>
                  </div>
                  <div className='flex flex-col items-center justify-center gap-1 cursor-pointer'>
                     <ShoppingBagIcon className='h-7 w-7' />
                     <div className='text-xs tracking-wide hidden sm:block'>Cart</div>
                  </div>
               </div>
            </nav>
            <div className='flex justify-center items-center gap-6 h-14 pb-2'>
               {categories.map((category, index) => (
                  <Link key={index} to={category.path} className='hidden sm:block'>{category.title}</Link>
               ))}
               <div className='block sm:hidden w-11/12 mx-auto'>
                  <Input type='text' name='head-search' placeholder='search products' className='w-full border-b border-black bg-transparent text-black placeholder:text-black px-2 py-1' />
               </div>
            </div>
         </header>

         {toggleMenu && <MobileMenu categories={categories} menuTransform={menuTransform} />}
      </>
   )
}

export default Header