import Divider from '../../components/ui/divider'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { IProduct } from '../../types/productsTypes'
import { ICart } from '../../types/cartTypes'
import { useAppSelector } from '../../store/hooks'
import { useCart } from '../../hooks/useCart'

const Products: React.FC = () => {

   // getting cart from redux store
   const { cart } = useAppSelector(state => state.cart)
   // getting methods from custom hook
   const { handleCart, changeQuantity } = useCart()

   const handleChange = (value: string, product: ICart) => {
      const quantity = +value
      changeQuantity(product, quantity)
   }

   return (
      <div className='col-span-8 lg:col-span-5'>
         <div className='pr-0 md:pr-16'>
            <Divider variant='soft' styles='my-5' />
            {cart ? cart.map((product: ICart) => (
               <div key={product.id}>
                  <div className='flex my-14'>
                     <Link to={`/products/${product.id}`} className='w-32 h-32 sm:w-48 sm:h-48 p-4 bg-zinc-50 rounded-md'>
                        <img src={product.image} alt='ecommerce' className='max-w-full w-full h-full block mix-blend-multiply' />
                     </Link>
                     <div className='flex-1 ms-0 sm:ms-6 flex flex-col justify-between'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 ps-6 sm:ps-0 sm:gap-6 relative'>
                           <div>
                              <h3 className='text-sm max-w-xs'>
                                 <Link to={`/products/${product.id}`}>{product.title}</Link>
                              </h3>
                              <p className='mt-1 text-sm text-gray-400'>{product.category}</p>
                              <div className='mt-1 text-sm'>${(product.price * product.quantity).toFixed(2)}</div>
                           </div>
                           <div className='mt-4 sm:mt-0'>
                              <select name='quantity' id='quantity' className='text-base sm:text-sm font-medium py-1.5 px-3 border rounded-md' onChange={(event) => handleChange(event.target.value, product)} value={product.quantity}>
                                 {Array.from({ length: 10 }).map((number, index) => (
                                    <option key={index} value={index + 1}>{index + 1}</option>
                                 ))}
                              </select>

                              <XMarkIcon className='absolute -top-8 sm:top-0 right-0 w-5 h-5 text-gray-400 hover:text-gray-900 cursor-pointer' onClick={() => handleCart('delete', product)} />

                           </div>
                        </div>
                        <div className='mt-4 text-sm flex items-center gap-2 ps-6 sm:ps-0'>
                           <CheckIcon className='w-5 h-5 text-green-500' /><span>In stock</span>
                        </div>
                     </div>

                  </div>
                  <Divider variant='soft' />
               </div>
            )) : null}
         </div>
      </div>
   )
}

export default Products