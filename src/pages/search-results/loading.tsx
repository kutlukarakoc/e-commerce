const LoadingSkeleton: React.FC = () => {
   return (
      <div className='bg-zinc-50 h-[525px] p-10 relative rounded-md animate-pulse'>
         <div className='absolute top-2 right-3 w-7 h-4 rounded-md bg-gray-600'>fav</div>
         <div className='w-full max-w-[250px] max-h-[275px] h-full mx-auto rounded-md bg-gray-600'></div>
         <div className='mt-10 mb-1 w-3/4 h-5 rounded-md bg-gray-600'></div>
         <div className='w-32 h-3 rounded-md bg-gray-600'></div>
         <div className='mb-6 w-16 h-3 rounded-md bg-gray-600'></div>
         <div className='w-full h-11 rounded-md bg-gray-600'></div>
      </div>
   )
}

export default LoadingSkeleton