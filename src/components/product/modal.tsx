import { Link } from 'react-router-dom'
import Button from '../../components/ui/button'
import { HeartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useWindowWidth } from '../../hooks/useWindowWidth'

interface IDesktopModal {
   productId: number
   toggleState: boolean
   handleClick: (productId: number) => void
}

const ProductModal: React.FC<IDesktopModal> = ({ productId, toggleState, handleClick }) => {

   const windowWidth = useWindowWidth()

   // set modal classes depends on window width
   let modalClasses: string
   if (windowWidth > 768) {
      modalClasses = 'hidden group-hover:flex'
   } else {
      modalClasses = toggleState ? 'flex' : 'hidden'
   }

   return (
      <div className={'absolute h-24 z-10 bg-[#ffffffed] shadow justify-center items-center flex-col gap-4 left-1/2 -translate-x-1/2 bottom-4 w-11/12 ' + modalClasses}>
         {/* link to visit the product */}
         <Link to={`/products/${productId}`} className='underline text-xs'>Visit</Link>
         <div className='flex justify-center items-center gap-4'>
            {/* add to cart button */}
            <Button type='button' variant='filled' color='indigo' size='md' className='px-6 py-3 font-semibold leading-5'>
               Add to cart
            </Button>
            <div className='w-10'>
               <HeartIcon className='w-full h-full cursor-pointer' />
               {/* <HeartIcon className='w-full h-full text-red-500 fill-red-500'/> */}
            </div>
         </div>
         {
            // close the modal button
            windowWidth < 768 && <XMarkIcon className='w-5 h-5 z-20 absolute top-2 right-2 cursor-pointer' onClick={() => handleClick(productId)} />
         }
      </div>
   )
}

export default ProductModal