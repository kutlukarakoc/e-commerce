import { Link } from 'react-router-dom'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'

interface CategoriesProps {
   title: string
   path: string
}

const MobileMenu: React.FC<{ categories: CategoriesProps[]; menuTransform: string}> = ({ categories, menuTransform }) => {
   return (
      <div 
         className="absolute z-10 w-64 h-72 shadow-lg bg-white top-20 left-0 flex flex-col justify-between items-start p-6 transition-transform"
         style={{transform: menuTransform}}   
      >
         <div className="flex flex-col justify-center items-start gap-4">
            {categories.map((category: CategoriesProps, index: number) => (
               <Link key={index} to={category.path}>{category.title}</Link>
            ))}
         </div>
         <div className='border-solid border-t border-slate-500 w-full'></div>
         <div className='w-full'>
            <div className='flex items-center'>
               <ArrowRightOnRectangleIcon className='h-6 w-6 cursor-pointer' /> Logout
            </div>
         </div>
      </div>
   )
}

export default MobileMenu