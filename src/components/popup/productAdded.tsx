import { IProduct } from '../../types/productsTypes'
import Button from '../ui/button'


interface IProductAdded {
   product: IProduct
   setRedirect: React.Dispatch<React.SetStateAction<boolean>>
}

const ProductAdded: React.FC<IProductAdded> = ({ product, setRedirect }) => {

   const handleClick = () => {
      setRedirect(true)
   }

   return (
      <div data-cy='product-added' className='p-4'>
         <h2 className='text-2xl font-medium mb-6'>You have just added</h2>
         <h4 data-cy='product-added-title' className='text-base font-medium mb-6'>{product.title}</h4>
         <Button variant='filled' size='sm' color='indigo' className='py-2 px-8 mx-auto' onClick={handleClick}>View cart</Button>
      </div>
   )
}

export default ProductAdded