interface IProductLoading {
   count: number
   loading: boolean
   hasIcon: boolean
}

const LoadingSkeleton: React.FC<IProductLoading> = ({ count, loading, hasIcon }) => {
   if (loading) {
      return (
         <>
            {Array.from({ length: count }).map((item, index) => (
               <div data-cy='loading-skeleton' key={index} className='bg-zinc-50 h-[525px] p-8 rounded-md relative animate-pulse'>
                  {hasIcon ? <div className='absolute top-2 right-3 w-6 h-6 rounded-full bg-gray-600'></div> : null}
                  <div className='w-full block aspect-video max-w-[300px] max-h-[315px] h-full mx-auto rounded-md bg-gray-600'></div>
                  <div className='bg-gray-600 w-4/5 h-3 rounded-lg mt-8 mb-3'></div>
                  <div className='bg-gray-600 w-3/12 h-2 rounded-md mb-3'></div>
                  <div className='bg-gray-600 w-11 h-2 rounded-md mb-6'></div>
                  <div className='bg-gray-600 w-full h-10 rounded-md'></div>
               </div>
            ))}
         </>
      )
   }

   return null
}

export default LoadingSkeleton