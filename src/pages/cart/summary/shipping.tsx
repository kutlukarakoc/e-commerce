import Divider from '../../../components/ui/divider'
import { useEffect, useState } from 'react'
import { ICart } from '../../../types/cartTypes'
import { useAppSelector } from '../../../store/hooks'

const Shipping: React.FC = () => {

   // getting cart from redux store
   const { cart } = useAppSelector(state => state.cart)
   // keep track of shipping estimate
   const [shippingEstimateText, setShippingEstimateText] = useState<string>('0.00')

   // set shippingEstimateText state depends on subtotal
   const calculateShippingEstimate = () => {
      if (cart.length) {
         const total: number | undefined = cart
            .map((product: ICart) => {
               if (product.quantity) return product.price * product.quantity
            })
            .reduce((acc: any, curr) => acc + curr)

         if (total && +total > 100) {
            setShippingEstimateText('0.00')
         } else {
            setShippingEstimateText('5.00')
         }
      }
   }

   // execute calculateShippingEstimate function when cart changes
   useEffect(() => {
      calculateShippingEstimate()
   }, [cart])

   return (
      <>
         <div className='flex justify-between items-center'>
            <div className='text-gray-500 text-sm'>Shipping estimate</div>
            <div className='text-sm'>${shippingEstimateText}</div>
         </div>
         <Divider variant='soft' />
      </>
   )
}

export default Shipping