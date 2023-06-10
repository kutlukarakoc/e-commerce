import { ICart } from '../../../types/cartTypes'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useCart } from '../../../hooks/useCart'

interface IDelete {
   product: ICart
}

const Delete: React.FC<IDelete> = ({ product }) => {

   // getting handleCart method from custom hook
   const { handleCart } = useCart()

   return (
      <XMarkIcon
         className='absolute -top-8 sm:top-0 right-0 w-5 h-5 text-gray-400 hover:text-gray-900 cursor-pointer'
         onClick={() => handleCart('delete', product)}
      />
   )
}

export default Delete