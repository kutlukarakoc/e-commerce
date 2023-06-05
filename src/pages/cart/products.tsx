import Divider from '../../components/ui/divider'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const Products: React.FC = () => {
   return (
      <div className='pr-16'>
         <Divider variant='soft' styles='mt-0 mb-5' />
         <div className='flex w-100'>
            <div className='w-24 h-24 sm:w-48 sm:h-48'>
               <img src='https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg' alt='ecommerce' className='max-w-full block' />
            </div>
            <div className='flex-1 ms-0 sm:ms-6 flex flex-col justify-between'>
               <div className='grid grid-cols-2 ps-9 sm:ps-0 sm:gap-6 relative'>
                  <div>
                     <h3 className='flex justify-between text-sm'>
                        <Link to='/'>Basic tee</Link>
                     </h3>
                     <p className='mt-1 text-sm text-gray-400'>Mens clothing</p>
                     <div className='mt-1 text-sm'>$32.00</div>
                  </div>
                  <div className='mt-4 sm:mt-0'>
                     <select name='quantity' id='quantity' className='text-base sm:text-sm font-medium py-1.5 px-3 border rounded-md'>
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                        <option value="">4</option>
                        <option value="">5</option>
                        <option value="">6</option>
                        <option value="">7</option>
                        <option value="">8</option>
                     </select>

                     <XMarkIcon className='absolute top-0 right-0 w-5 h-5 text-gray-400 hover:text-gray-900 cursor-pointer' />

                  </div>
               </div>
               <div className='mt-4 text-sm flex items-center gap-2'>
                  <CheckIcon className='w-5 h-5 text-green-500' /><span>In stock</span>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Products