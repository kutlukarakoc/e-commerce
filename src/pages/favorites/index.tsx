import { TrashIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/button'
import Divider from '../../components/ui/divider'

const Favorites = () => {
   return (
      <div className='container mx-auto my-20 flex-1'>
         <h1 className='text-lg font-semibold'>My Wish List (3 products)</h1>
         <Divider />
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            <div className='group bg-zinc-50 h-[525px] p-8 relative rounded'>
               <div className='absolute top-2 right-2 cursor-pointer'>
                  <TrashIcon className='w-6 h-6' />
               </div>
               <Link to='/'>
                  <img src='https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg' alt='ecommerce' className='w-full block aspect-video max-w-[250px] max-h-[275px] h-full mx-auto mix-blend-multiply' />
               </Link>
               <Link to='/' className='mt-10 mb-1 text-base text-left font-semibold h-6 line-clamp-1 overflow-hidden'>Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops</Link>
               <p className='text-sm mb-3'>men's clothing</p>
               <div className='font-semibold text-left mb-6'>$109.95</div>
               <Button variant='filled' color='indigo' size='sm' className='w-full h-11'>Add to cart</Button>
            </div>
         </div>
      </div>
   )
}

export default Favorites