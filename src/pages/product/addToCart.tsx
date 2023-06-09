import ProductAdded from '../../components/popup/productAdded'
import Button from '../../components/ui/button'
import { useAppSelector } from '../../store/hooks'
import { useEffect, useState } from 'react'
import { useCart } from '../../hooks/useCart'
import { useSwal } from '../../hooks/useSwal'
import { useNavigate } from 'react-router-dom'
import { IProduct } from '../../types/productsTypes'

interface IAddToCart {
   product: IProduct
}

const AddToCart: React.FC<IAddToCart> = ({product}) => {
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
         handleCart('add', product, 1)
         if (!cartLoading && !cartError) {
            showSwal(<ProductAdded product={product} setRedirect={setRedirect} />, 'success')
         } else {
            navigate('/auth')
         }
      }
   }

   // navigate to cart when redirect state is true
   // close modal and set false to redirect state when component unmount
   useEffect(() => {
      if (redirect) navigate('/cart')

      return () => {
         closeSwal()
         setRedirect(false)
      }
   }, [redirect, navigate])

   return (
      <Button type='button' variant='filled' color='indigo' size='md' className='px-6 py-3 font-semibold leading-5' onClick={handleClick}>
         Add to cart
      </Button>
   )
}

export default AddToCart