import Button from '../ui/button'
import Favorite from '../ui/favorite'
import ProductAdded from '../popup/productAdded'
import { IProduct } from '../../types/productsTypes'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import { useCart } from '../../hooks/useCart'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSwal } from '../../hooks/useSwal'

interface IProductCard {
   products: IProduct[]
}

const ProductCard: React.FC<IProductCard> = ({ products }) => {

   const navigate = useNavigate()

   // keep track of navigate from view cart button in popup
   const [redirect, setRedirect] = useState<boolean>(false)

   // getting user from redux store
   const { user } = useAppSelector(state => state.auth)
   // getting cart loading state and method from custom hook
   const { cartLoading, cartError, handleCart } = useCart()
   // getting swal from custom hook
   const { showSwal, closeSwal } = useSwal()

   // add to cart and show popup
   const handleAddToCart = (product: IProduct) => {
      if (user?.uid) {
         handleCart('add', product, 1)
         if (!cartLoading && !cartError) {
            showSwal(<ProductAdded product={product} setRedirect={setRedirect} />, 'success')
         }
      } else {
         navigate('/auth')
      }
   }

   // navigate to cart when redirect state is true
   // close modal and set false to redirect state when component unmount
   useEffect(() => {
      if (redirect) {
         closeSwal()
         navigate('/cart')
      }

      return () => setRedirect(false)
   }, [redirect, navigate])

   return (
      <>
         {products.map(product => (
            <div key={product.id} className='group bg-zinc-50 h-[525px] p-10 relative rounded-md'>
               <Favorite product={product} className='absolute top-2 right-3 w-7' />
               <Link to={`/products/${product.id}`} className='cursor-pointer'>
                  <img src={product.image} alt='ecommerce' className='w-full block aspect-video max-w-[250px] max-h-[275px] h-full mx-auto mix-blend-multiply' />
               </Link>
               <Link to={`/products/${product.id}`} className='cursor-pointer'>
                  <h3 className='mt-10 mb-1 text-base text-left font-semibold h-6 line-clamp-1 overflow-hidden'>{product.title}</h3>
               </Link>
               <p className='text-sm mb-3'>{product.category}</p>
               <div className='font-semibold text-left items-center mb-6'>${product.price.toFixed(2)}</div>
               <Button type='button' variant='filled' color='indigo' size='md' className='w-full h-11' onClick={() => handleAddToCart(product)}>
                  Add to cart
               </Button>
            </div>
         ))}
      </>
   )
}

export default ProductCard