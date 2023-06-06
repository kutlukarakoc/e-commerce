import { useState, useEffect } from 'react'
import { useCart } from '../../../hooks/useCart'
import { IProduct } from '../../../types/productsTypes'

const OrderTotal: React.FC = () => {

   // getting cart from custom hook
   const { cart } = useCart()
   // keep track of total price
   const [totalPrice, setTotalPrice] = useState<number>(0)

   // calculate total price depends on subtotal and shipping estimate
   const calculateTotalPrice = () => {
      if (cart.length) {
         const total: number | undefined = cart
            .map((product: IProduct) => {
               if (product.quantity) return product.price * product.quantity
            })
            .reduce((acc: any, curr) => acc + curr)

         if (total) {
            +total > 100 ? setTotalPrice(+total.toFixed(2)) : setTotalPrice(+total.toFixed(2) + 5)
         }
      }
   }

   // execute calculateTotalPrice function when cart changes
   useEffect(() => {
      calculateTotalPrice()
   }, [cart])

   return (
      <div className='flex justify-between items-center'>
         <div className='font-medium'>Order total</div>
         <div className='font-medium'>${totalPrice}</div>
      </div>
   )
}

export default OrderTotal