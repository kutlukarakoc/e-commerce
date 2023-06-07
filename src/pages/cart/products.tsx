import Divider from '../../components/ui/divider'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { IProduct } from '../../types/productsTypes'
import { useAppSelector } from '../../store/hooks'

const Products: React.FC = () => {

   // getting cart from redux store
   const { cart } = useAppSelector(state => state.cart)

   return (
      <div className='col-span-8 lg:col-span-5'>
         <div className='pr-0 md:pr-16'>
            <Divider variant='soft' styles='mt-0 mb-5' />
            {
               cart ? cart.map((item: IProduct) => (
                  <div key={item.id}>
                     <div className='flex w-100 my-14'>
                        <div className='w-32 h-32 sm:w-48 sm:h-48 p-4 bg-zinc-100 rounded-md'>
                           <img src={item.image} alt='ecommerce' className='max-w-full w-full h-full block mix-blend-multiply' />
                        </div>
                        <div className='flex-1 ms-0 sm:ms-6 flex flex-col justify-between'>
                           <div className='grid grid-cols-1 sm:grid-cols-2 ps-6 sm:ps-0 sm:gap-6 relative'>
                              <div>
                                 <h3 className='flex justify-between text-sm max-w-xs'>
                                    <Link to={`/products/${item.id}`}>{item.title}</Link>
                                 </h3>
                                 <p className='mt-1 text-sm text-gray-400'>{item.category}</p>
                                 <div className='mt-1 text-sm'>${item.price.toFixed(2)}</div>
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

                                 <XMarkIcon className='absolute -top-8 sm:top-0 right-0 w-5 h-5 text-gray-400 hover:text-gray-900 cursor-pointer' />

                              </div>
                           </div>
                           <div className='mt-4 text-sm flex items-center gap-2 ps-6 sm:ps-0'>
                              <CheckIcon className='w-5 h-5 text-green-500' /><span>In stock</span>
                           </div>
                        </div>

                     </div>
                     <Divider variant='soft' />
                  </div>
               )) : null
            }
         </div>
      </div>
   )
}

export default Products