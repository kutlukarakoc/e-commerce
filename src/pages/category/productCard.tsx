import { IProduct } from '../../types/productsTypes'
import ProductModal from './productModal'
import { WindowIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

interface IProductCard {
   products: IProduct[]
}

const ProductCard: React.FC<IProductCard> = ({ products }) => {

   const [modalStatuses, setModalStatuses] = useState<{ [key: number]: boolean }>({});

   // click event to toggle modal status
   const handleClick = (productId: number) => {
      setModalStatuses((prevState) => ({
         ...prevState,
         [productId]: !prevState[productId],
      }));
   }

   return (
      <>
         {products.map(product => (
            <div key={product.id} className='group bg-zinc-50 h-[475px] p-4 relative rounded'>
               <img src={product.image} alt='ecommerce' className='w-full block aspect-video max-w-[315px] max-h-[330px] h-full mx-auto mix-blend-multiply' />
               <h3 className='mt-10 mb-1 text-base text-left font-semibold h-6 line-clamp-1 overflow-hidden'>{product.title}</h3>
               <p className='text-sm mb-3'>{product.category}</p>
               <div className='flex justify-between items-center'>
                  <div className='font-semibold text-left'>${product.price.toFixed(2)}</div>
                  <WindowIcon className='w-6 h-6 cursor-pointer block md:hidden' onClick={() => handleClick(product.id)} />
               </div>
               {/* Render the ProductModal component */}
               <ProductModal toggleState={modalStatuses[product.id]} handleClick={handleClick} productId={product.id} />
            </div>
         ))}
      </>
   )
}

export default ProductCard