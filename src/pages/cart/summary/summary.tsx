import Button from '../../../components/ui/button'
import Subtotal from './subtotal'
import Shipping from './shipping'
import OrderTotal from './orderTotal'

const Summary: React.FC = () => {
   return (
      <div className='col-span-8 lg:col-span-3'>
         <div className='w-full bg-zinc-50 rounded-md mt-16 sm:mt-0 px-4 py-5 sm:p-5 lg:p-8h'>
            <h2 className='text-lg'>Order Summary</h2>
            <div className='mt-6'>
               <Subtotal />
               <Shipping />
               <OrderTotal />
            </div>
            <Button variant='filled' color='indigo' size='sm' className='mt-10 w-full py-4'>Checkout</Button>
         </div>
      </div>
   )
}

export default Summary