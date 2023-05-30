const LoadingSkeleton = () => {
   return (
      <section className='container mx-auto my-24 animate-pulse'>
         <div className='flex justify-center items-center flex-col gap-12'>
            <div className='mx-auto w-full max-w-sm sm:max-w-md'>
               <div className='w-32 h-32 rounded-full mx-auto mb-3 bg-gray-600'></div>
               <div className='flex items-center justify-center gap-4 mb-10'>
                  <div className='w-6 h-6 rounded bg-gray-600' />
                  <div className='w-6 h-6 rounded bg-gray-600' />
               </div>

               <div className='mb-8 w-60 h-6 rounded mx-auto bg-gray-600'></div>

               <div className='mb-8 grid grid-cols-2 gap-6'>
                  <div className='w-52 h-10 rounded bg-gray-600' />
                  <div className='w-52 h-10 rounded bg-gray-600' />
               </div>

               <div className='mb-8 grid grid-cols-2 gap-6'>
                  <div className='w-52 h-10 rounded bg-gray-600' />
                  <div className='w-52 h-10 rounded bg-gray-600' />
               </div>

               <div className='mb-8 grid grid-cols-2 gap-6'>
                  <div className='w-52 h-10 rounded bg-gray-600' />
                  <div className='w-52 h-10 rounded bg-gray-600' />
               </div>

               <div className='mb-10'>
                  <div className='flex items-center gap-4'>
                     <div className='w-14 h-6 rounded bg-gray-600' />
                     <div className='w-14 h-6 rounded bg-gray-600' />
                     <div className='w-14 h-6 rounded bg-gray-600' />
                  </div>
               </div>

               <div className='w-52 h-11 rounded mx-auto bg-gray-600' ></div>

            </div>
            <div className='w-full flex items-center justify-between max-w-sm sm:max-w-md'>
               <div className='w-36 h-10 rounded bg-gray-600' ></div>
               <div className='w-36 h-10 rounded bg-gray-600' ></div>
            </div>
         </div>
      </section>
   )
}

export default LoadingSkeleton