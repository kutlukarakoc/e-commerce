import Button from '../../components/ui/button'
import Divider from '../../components/ui/divider'

const Summary: React.FC = () => {
   return (
      <div className='w-full bg-gray-100 rounded-md mt-16 sm:mt-0 px-4 py-5 sm:p-5 lg:p-8h'>
         <h2 className='text-lg'>Order Summary</h2>
         <div className='mt-6'>
            <div className='flex justify-between items-center'>
               <div className='text-gray-500 text-sm'>Subtotal</div>
               <div className='text-sm'>$99.00</div>
            </div>
            <Divider variant='soft' />
            <div className='flex justify-between items-center'>
               <div className='text-gray-500 text-sm'>Shipping estimate</div>
               <div className='text-sm'>$5.00</div>
            </div>
            <Divider variant='soft' />
            <div className='flex justify-between items-center'>
               <div className='font-medium'>Order total</div>
               <div className='font-medium'>$112.32</div>
            </div>
         </div>
         <Button variant='filled' color='indigo' size='sm' className='mt-10 w-full py-4'>Checkout</Button>
      </div>
   )
}

export default Summary