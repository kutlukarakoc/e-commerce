const LoadingSkeleton = () => {
   return (
      <div className='container mx-auto my-24 grid grid-cols-1 md:grid-cols-2 gap-8 2xl:gap-0 px-4 sm:px-0 animate-pulse'>
         <div className='bg-gray-600 rounded-md max-w-xl h-[350px] sm:h-[600px] flex justify-center items-center w-full mx-auto'></div>
         <div>
            <div className='bg-gray-600 w-4/5 h-14 rounded mb-5'></div>
            <div className='bg-gray-600 w-20 h-5 rounded mb-5'></div>
            <div className='flex gap gap-4 mb-8'>
               <div className='bg-gray-600 w-20 h-3 rounded'></div>
               <div className='bg-gray-600 w-16 h-3 rounded'></div>
            </div>
            <div className='bg-gray-600 w-4/5 h-3 rounded mb-6'></div>
            <div className='flex gap gap-6 mb-20'>
               <div className='bg-gray-600 w-20 h-8 rounded'></div>
               <div className='bg-gray-600 w-10 h-8 rounded'></div>
            </div>
            <div className='flex justify-between'>
               <div className='bg-gray-600 w-4/5 h-4 rounded mb-3'></div>
               <div className='bg-gray-600 w-8 h-4 rounded mb-3'></div>
            </div>
            <div className='my-5 border-t border-solid border-gray-500 w-full h-1'></div>
            <div className='flex justify-between'>
               <div className='bg-gray-600 w-4/5 h-4 rounded mb-3'></div>
               <div className='bg-gray-600 w-8 h-4 rounded mb-3'></div>
            </div>
         </div>
      </div>
   )
}

export default LoadingSkeleton