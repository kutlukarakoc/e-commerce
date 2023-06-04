import Divider from '../../components/ui/divider'

const LoadingSkeleton: React.FC = () => {
   return (
      <div className='container mx-auto my-20 flex-1'>
         <div className='bg-gray-600 w-52 h-3 rounded-lg'></div>
         <Divider />
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {Array.from({ length: 3 }).map((item, index) => (
               <div key={index} className='bg-zinc-50 h-[525px] p-8 rounded animate-pulse'>
                  <div className='w-full block aspect-video max-w-[315px] max-h-[330px] h-full mx-auto bg-gray-600'></div>
                  <div className='bg-gray-600 w-4/5 h-3 rounded-lg mt-8 mb-3'></div>
                  <div className='bg-gray-600 w-3/12 h-2 rounded mb-3'></div>
                  <div className='bg-gray-600 w-11 h-2 rounded mb-6'></div>
                  <div className='bg-gray-600 w-full h-10 rounded'></div>
               </div>
            ))}
         </div>
      </div>
   )
}

export default LoadingSkeleton