import Divider from '../../components/ui/divider'

const LoadingSkeleton: React.FC = () => {
   return (
      <section className='container mx-auto px-4 sm:px-0 my-20 flex-1 animate-pulse'>
         <h1 className='w-80 h-8 mb-8 rounded-lg bg-gray-600'></h1>
         <div className='grid grid-cols-8 md:gap-14'>
            <div className='col-span-8 lg:col-span-5'>
               <div className='pr-0 md:pr-11'>
                  <Divider variant='soft' styles='mt-0 mb-5' />
                  {Array.from({ length: 2 }).map((item, index) => (
                     <div key={index}>
                        <div className='flex my-14'>
                           <div className='w-32 h-32 sm:w-48 sm:h-48 p-4 bg-zinc-50 rounded-md'>
                              <div className='w-full h-full rounded-md bg-gray-600'></div>
                           </div>
                           <div className='flex-1 ms-0 sm:ms-6 flex flex-col justify-between'>
                              <div className='grid grid-cols-1 sm:grid-cols-2 ps-6 sm:ps-0 sm:gap-6 relative'>
                                 <div>
                                    <div className='w-full h-7 max-w-xs rounded-md bg-gray-600'></div>
                                    <div className='mt-2 w-24 h-3 rounded-md bg-gray-600'></div>
                                    <div className='mt-2 w-16 h-3 rounded-md bg-gray-600'></div>
                                 </div>
                                 <div className='mt-4 sm:mt-0'>
                                    <div className='w-20 h-6 rounded-md bg-gray-600'></div>
                                    <div className='absolute -top-8 sm:top-0 right-0 w-5 h-5 rounded-md bg-gray-600'></div>
                                 </div>
                              </div>
                              <div className='mt-4 ml-6 sm:ps-0 w-16 h-4 rounded-md bg-gray-600'></div>
                           </div>
                        </div>
                        <Divider variant='soft' styles='mt-0 mb-5' />
                     </div>
                  ))}
               </div>
            </div>

            <div className='col-span-8 lg:col-span-3'>
               <div className='w-full bg-zinc-50 rounded-md mt-16 sm:mt-0 px-4 py-5 sm:p-5 lg:p-8'>
                  <div className='w-44 h-5 rounded-md bg-gray-600'></div>
                  <div className='flex justify-between mt-7'>
                     <div className='w-14 h-3 rounded-md bg-gray-600'></div>
                     <div className='w-14 h-3 rounded-md bg-gray-600'></div>
                  </div>
                  <div className='flex justify-between my-7'>
                     <div className='w-24 h-3 rounded-md bg-gray-600'></div>
                     <div className='w-9 h-3 rounded-md bg-gray-600'></div>
                  </div>
                  <div className='flex justify-between'>
                     <div className='w-16 h-3 rounded-md bg-gray-600'></div>
                     <div className='w-16 h-3 rounded-md bg-gray-600'></div>
                  </div>
                  <div className='mt-10 w-full py-4 rounded-md bg-gray-600'></div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default LoadingSkeleton