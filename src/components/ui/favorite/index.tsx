import { HeartIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../store/hooks'
import { IProduct } from '../../../types/productsTypes'
import { useWishlist } from '../../../hooks/useWishlist'

interface IFavorite {
   product: IProduct
   className?: string
}

const Favorite: React.FC<IFavorite> = ({ product, className }) => {

   const navigate = useNavigate()
   // manage wishlist with custom hook
   const handleWishlist = useWishlist()

   // get logged in user information from redux store
   const { user } = useAppSelector(state => state.auth)
   // keep track of if product is in wishlist
   const [isInWishlist, setIsInWishlist] = useState<boolean>(false)

   // toggle wishlist 
   // check if product is in wishlist and set this status to isInWishlist state
   const toggleWishlist = async () => {
      if (user?.uid) {
         const currentWishlist = await handleWishlist(user.uid, product, 'toggle')

         const inWishlist = currentWishlist.some((prod: IProduct) => prod.id === product.id)
         setIsInWishlist(inWishlist)
      } else {
         navigate('/auth')
      }
   }

   // get wishlist and check if product is in wishlist or not
   const getWishlist = async () => {
      if (user?.uid && product.id) {
         const currentWishlist = await handleWishlist(user.uid)

         const inWishlist = currentWishlist.some((prod: IProduct) => prod.id === product.id)
         setIsInWishlist(inWishlist)
      }
   }

   // execute getWishlist function when component mount
   useEffect(() => {
      getWishlist()
   }, [])

   return (
      <div className={className}>
         <HeartIcon className={`w-full h-full cursor-pointer ${isInWishlist ? 'text-red-500 fill-red-500' : ''}`} onClick={toggleWishlist} />
      </div>
   )
}

export default Favorite