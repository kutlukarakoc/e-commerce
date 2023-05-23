const LoadingSkeleton: React.FC = () => {
   return (
      <>
         {Array.from({ length: 6 }).map((item, index) => (
            <div key={index} className='bg-zinc-50 h-[475px] p-4 rounded animate-pulse'>
               <div className='w-full block aspect-video max-w-[315px] max-h-[330px] h-full mx-auto bg-gray-600'></div>
               <div className='bg-gray-600 w-4/5 h-3 rounded-lg mt-8 mb-3'></div>
               <div className='bg-gray-600 w-3/12 h-2 rounded mb-3'></div>
               <div className='bg-gray-600 w-11 h-2 rounded'></div>
            </div>
         ))}
      </>
   )
}

export default LoadingSkeleton