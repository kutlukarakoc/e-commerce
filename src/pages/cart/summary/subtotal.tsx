import Divider from '../../../components/ui/divider'
import { useCart } from '../../../hooks/useCart'
import { useEffect, useState } from 'react'
import { IProduct } from '../../../types/productsTypes'

const Subtotal: React.FC = () => {

   // getting cart from custom hook
   const { cart } = useCart()
   // keep track of subtotal
   const [subtotal, setSubtotal] = useState<number>(0)

   // calculate subtotal price and set to subtotal state
   const calculateSubtotal = () => {
      if (cart.length) {
         const total: number | undefined = cart
            .map((product: IProduct) => {
               if (product.quantity) return product.price * product.quantity
            })
            .reduce((acc: any, curr) => acc + curr)

         if (total) setSubtotal(+total.toFixed(2))
      }
   }

   // execute calculateSbbtotal function when cart changes
   useEffect(() => {
      calculateSubtotal()
   }, [cart])

   return (
      <>
         <div className='flex justify-between items-center'>
            <div className='text-gray-500 text-sm'>Subtotal</div>
            <div className='text-sm'>${subtotal}</div>
         </div>
         <Divider variant='soft' />
      </>
   )
}

export default Subtotal