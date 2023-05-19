import { useWindowWidth } from '../../../hooks/useWindowWidth'

const LoadingSkeleton = () => {

   // getting current window width
   const windowWidth = useWindowWidth()

   // initial array size
   let arraySize = 1
   // change array size depends on window width for responsive look
   if (windowWidth > 670 && windowWidth < 1024) {
      arraySize = 2
   } else if (windowWidth >= 1024) {
      arraySize = 3
   }

   return (
      <div className='flex justify-around min-h-[325px] animate-pulse'>
         {Array.from({ length: arraySize }).map((item, index) => (
            <div key={index} className='h-64'>
               <div className='h-full w-48 sm:w-60'>
                  <div className='bg-gray-600 w-full h-full rounded'></div>
                  <div className='bg-gray-600 w-4/5 h-3 rounded-lg mt-8 mb-3'></div>
                  <p className='bg-gray-600 w-3/12 h-2 rounded mb-3'></p>
                  <div className='flex justify-between px-4 w-full'>
                     <div className='bg-gray-600 w-11 h-2 rounded'></div>
                     <div className='bg-gray-600 w-7 h-2 rounded'></div>
                  </div>
               </div>
            </div>
         ))}
      </div>
   )
}

export default LoadingSkeleton