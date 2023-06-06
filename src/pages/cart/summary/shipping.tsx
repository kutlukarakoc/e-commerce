import Divider from '../../../components/ui/divider'
import { useEffect, useState } from 'react'
import { useCart } from '../../../hooks/useCart'
import { IProduct } from '../../../types/productsTypes'

const Shipping: React.FC = () => {

   // getting cart from custom hook
   const { cart } = useCart()
   // keep track of shipping estimate
   const [shippingEstimateText, setShippingEstimateText] = useState<string>('0.00')

   // set shippingEstimateText state depends on subtotal
   const calculateShippingEstimate = () => {
      if (cart.length) {
         const total: number | undefined = cart
            .map((product: IProduct) => {
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