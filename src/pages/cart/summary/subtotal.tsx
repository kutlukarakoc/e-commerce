import Divider from '../../../components/ui/divider'
import { useAppSelector } from '../../../store/hooks'
import { useEffect, useState } from 'react'
import { ICart } from '../../../types/cartTypes'

const Subtotal: React.FC = () => {

   // getting cart from redux store
   const { cart } = useAppSelector(state => state.cart)
   // keep track of subtotal
   const [subtotal, setSubtotal] = useState<number>(0)

   // calculate subtotal price and set to subtotal state
   const calculateSubtotal = () => {
      if (cart.length) {
         const totalArr: number[] = cart.map((product: ICart) => product.price * product.quantity)
         if (totalArr.length > 0) {
            const totalPrice = totalArr.reduce((acc: number, curr?: number) => acc + (curr || 0), 0);
            setSubtotal(+totalPrice.toFixed(2));
         }
      }
   };


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