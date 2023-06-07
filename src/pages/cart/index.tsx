import Products from './products'
import Summary from './summary/summary'
import { useAppSelector } from '../../store/hooks'

const Cart: React.FC = () => {

   // getting cart from redux store
   const { cart } = useAppSelector(state => state.cart)

   return (
      <section className='container mx-auto px-4 sm:px-0 my-20 flex-1'>
         <h1 className='text-3xl font-semibold mb-16'>Shopping Cart ({cart.length} products)</h1>
         <div className='grid grid-cols-8'>
            <Products />
            <Summary />
         </div>
      </section>
   )
}

export default Cart