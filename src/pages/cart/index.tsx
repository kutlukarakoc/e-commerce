import Products from './products/products'
import Summary from './summary/summary'
import Title from '../../components/title'
import LoadingSkeleton from './loading'
import { useAppSelector } from '../../store/hooks'
import { useCart } from '../../hooks/useCart'
import NotFound from '../../components/not-found'

const Cart: React.FC = () => {

   // getting cart from redux store
   const { cart } = useAppSelector(state => state.cart)
   // getting cart loading and error status from custom hook
   const { cartLoading, cartError } = useCart()

   if (cartLoading) {
      return <LoadingSkeleton />
   }

   if (cartError) {
      <NotFound title='Something went wrong.' text='Please try again later.' link='/' linkText='Go back home' />
   }

   return (
      <>
         {cart.length ? (
            <section className='container mx-auto px-4 sm:px-0 my-20 flex-1'>
               <Title cypressAttr='cart-title' className='sm:text-left'>Shopping Cart ({cart.length} products)</Title>
               <div className='grid grid-cols-8'>
                  <Products />
                  <Summary />
               </div>
            </section>
         ) : <NotFound title='Your cart is empty.' text='Keep shopping!' link='/products' linkText='See products' isErrorCode={false} />}
      </>
   )
}

export default Cart