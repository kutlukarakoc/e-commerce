import ShouldLogin from '../../popup/shouldLogin'
import { HeartIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../store/hooks'
import { IProduct } from '../../../types/productsTypes'
import { useWishlist } from '../../../hooks/useWishlist'
import { useSwal } from '../../../hooks/useSwal'

interface IFavorite {
   product: IProduct
   className?: string
}

const Favorite: React.FC<IFavorite> = ({ product, className }) => {

   const navigate = useNavigate()
   // manage wishlist with custom hook
   const { handleWishlist } = useWishlist()
   // getting swal from custom hook
   const { showSwal, closeSwal } = useSwal()
   // get logged in user information from redux store
   const { user } = useAppSelector(state => state.auth)
   // keep track of if product is in wishlist
   const [isInWishlist, setIsInWishlist] = useState<boolean>(false)
   // keep track of navigate from view cart button in popup
   const [redirect, setRedirect] = useState<boolean>(false)

   // toggle wishlist 
   // check if product is in wishlist and set this status to isInWishlist state
   const toggleWishlist = async () => {
      if (user?.uid) {
         const currentWishlist = await handleWishlist(product, 'toggle')

         const inWishlist = currentWishlist.some((prod: IProduct) => prod.id === product.id)
         setIsInWishlist(inWishlist)
      } else {
         showSwal(<ShouldLogin setRedirect={setRedirect} />, 'warning')
      }
   }

   // get wishlist and check if product is in wishlist or not
   const getWishlist = async () => {
      if (product.id && user?.uid) {
         const currentWishlist = await handleWishlist()

         const inWishlist = currentWishlist.some((prod: IProduct) => prod.id === product.id)
         setIsInWishlist(inWishlist)
      }
   }

   // when true, if user logged in navite to cart, if not navigate to auth
   // close modal and set false to redirect state when component unmount
   useEffect(() => {
      if (redirect) {
         closeSwal()
         user?.uid ? navigate('/cart') : navigate('/auth')
      }

      return () => setRedirect(false)
   }, [redirect, navigate])

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