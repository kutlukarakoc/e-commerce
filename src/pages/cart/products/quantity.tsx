import { ICart } from '../../../types/cartTypes'
import { useCart } from '../../../hooks/useCart'

interface IQuantity {
   product: ICart
}

const Quantity: React.FC<IQuantity> = ({ product }) => {

   // getting changeQuantity method from custom hook
   const { changeQuantity } = useCart()

   // change product quantity by given value
   const handleChange = (value: string, product: ICart) => {
      const quantity = +value
      changeQuantity(product, quantity)
   }

   return (
      <select
         data-cy='quantity'
         name='quantity'
         className='text-base sm:text-sm font-medium py-1.5 px-3 border rounded-md'
         onChange={(event) => handleChange(event.target.value, product)}
         value={product.quantity}
      >
         {Array.from({ length: 10 }).map((number, index) => (
            <option key={index} value={index + 1}>{index + 1}</option>
         ))}
      </select>
   )
}

export default Quantity