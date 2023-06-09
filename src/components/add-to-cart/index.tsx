import ProductAdded from '../popup/productAdded'
import ShouldLogin from '../popup/shouldLogin'
import Button from '../ui/button'
import { useAppSelector } from '../../store/hooks'
import { useEffect, useState } from 'react'
import { useCart } from '../../hooks/useCart'
import { useSwal } from '../../hooks/useSwal'
import { useNavigate } from 'react-router-dom'
import { IProduct } from '../../types/productsTypes'

interface IAddToCart {
   product: IProduct
   isFull?: boolean
}

const AddToCart: React.FC<IAddToCart> = ({ product, isFull = false }) => {
   const navigate = useNavigate()

   // keep track of navigate from view cart button in popup
   const [redirect, setRedirect] = useState<boolean>(false)
   // getting user from redux store
   const { user } = useAppSelector(state => state.auth)
   // gettin cart loading state and method from custom hook
   const { cartLoading, cartError, handleCart } = useCart()
   // getting swal from custom hook
   const { showSwal, closeSwal } = useSwal()

   // add to cart and show popup
   const handleClick = () => {
      if (user?.uid) {
         handleCart('add', product)
         if (!cartLoading && !cartError) {
            showSwal(<ProductAdded product={product} setRedirect={setRedirect} />, 'success')
         }
      } else {
         showSwal(<ShouldLogin setRedirect={setRedirect} />, 'warning')
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

   return (
      <Button type='button' variant='filled' color='indigo' size='md' className={`px-6 py-3 leading-5 ${isFull ? 'w-full' : ''}`} onClick={handleClick}>
         Add to cart
      </Button>
   )
}

export default AddToCart