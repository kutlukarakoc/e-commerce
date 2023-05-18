import { TruckIcon, ShieldCheckIcon, BanknotesIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline'

const Information: React.FC = () => {
   return (
      <section className='container mx-auto grid grid-cols-2 md:grid-cols-4 mb-32'>
         <div className='md:border-r-2 md:border-solid md:border-gray-500 text-center py-8 md:py-3 md:pe-10'>
            <TruckIcon className='h-16 sm:h-20 w-16 sm:w-20 mx-auto text-gray-700' />
            <h4 className='mt-4'>Free Shipping</h4>
         </div>
         <div className='md:border-r-2 md:border-solid md:border-gray-500 text-center py-8 md:py-3 md:px-10'>
            <ShieldCheckIcon className='h-16 sm:h-20 w-16 sm:w-20 mx-auto text-gray-700' />
            <h4 className='mt-4'>Secure Shopping</h4>
         </div>
         <div className='md:border-r-2 md:border-solid md:border-gray-500 text-center py-8 md:py-3 md:px-10'>
            <BanknotesIcon className='h-16 sm:h-20 w-16 sm:w-20 mx-auto text-gray-700' />
            <h4 className='mt-4'>Easy Returns/Exchanges</h4>
         </div>
         <div className='text-center py-8 md:py-3 md:ps-10'>
            <DevicePhoneMobileIcon className='h-16 sm:h-20 w-16 sm:w-20 mx-auto text-gray-700' />
            <h4 className='mt-4'>Mobile App</h4>
         </div>
      </section>
   )
}

export default Information