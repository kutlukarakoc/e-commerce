import { useState, useEffect } from 'react'
import { ICart } from '../../../types/cartTypes'
import { useAppSelector } from '../../../store/hooks'

const OrderTotal: React.FC = () => {

   // getting cart from redux store
   const { cart } = useAppSelector(state => state.cart)
   // keep track of total price
   const [totalPrice, setTotalPrice] = useState<number>(0)

   // calculate total price depends on subtotal and shipping estimate
   const calculateTotalPrice = () => {
      if (cart.length) {
         const total: number | undefined = cart
            .map((product: ICart) => {
               if (product.quantity) return product.price * product.quantity
            })
            .reduce((acc: any, curr) => acc + curr)

         if (total) {
            +total > 100 ? setTotalPrice(+total) : setTotalPrice(+total + 5)
         }
      } else {
         setTotalPrice(0)
      }
   }

   // execute calculateTotalPrice function when cart changes
   useEffect(() => {
      calculateTotalPrice()
   }, [cart])

   return (
      <div className='flex justify-between items-center'>
         <div className='font-medium'>Order total</div>
         <div data-cy='order-total' className='font-medium'>${totalPrice.toFixed(2)}</div>
      </div>
   )
}

export default OrderTotal