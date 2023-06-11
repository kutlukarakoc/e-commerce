import { useWishlist } from '../../hooks/useWishlist'
import { TrashIcon } from '@heroicons/react/24/outline'
import { IProduct } from '../../types/productsTypes'

interface ITrash {
   product: IProduct
}

const Trash: React.FC<ITrash> = ({ product }) => {

   // manage wishlist with custom hook
   const { handleWishlist } = useWishlist()
   // remove product from wishlist
   const handleFavorite = async (product: IProduct) => await handleWishlist(product, 'delete')

   return (
      <div className='absolute top-2 right-2 cursor-pointer' onClick={() => handleFavorite(product)}>
         <TrashIcon className='w-6 h-6' />
      </div>
   )

}

export default Trash