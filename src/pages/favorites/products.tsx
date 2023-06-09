import Button from '../../components/ui/button'
import ProductAdded from '../../components/popup/productAdded'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useWishlist } from '../../hooks/useWishlist'
import { useCart } from '../../hooks/useCart'
import { useSwal } from '../../hooks/useSwal'
import { useAppSelector } from '../../store/hooks'
import { IProduct } from '../../types/productsTypes'
import { TrashIcon } from '@heroicons/react/24/outline'

const WishlistProducts: React.FC = () => {

   const navigate = useNavigate()

   // keep track of navigate from view cart button in popup
   const [redirect, setRedirect] = useState<boolean>(false)

   // getting wishlist from redux store
   const { wishlist } = useAppSelector(state => state.wishlist)
   // manage wishlist with custom hook
   const { handleWishlist } = useWishlist()
   // getting method from custom hook
   const { handleCart, cartError, cartLoading } = useCart()
   // getting swal from custom hook
   const { showSwal, closeSwal } = useSwal()

   // remove product from wishlist
   const handleFavorite = async (product: IProduct) => {
      await handleWishlist(product, 'delete')
   }

   // add to cart and show popup
   const handleAddToCart = async (product: IProduct) => {
      handleCart('add', product, 1)
      if (!cartLoading && !cartError) {
         showSwal(<ProductAdded product={product} setRedirect={setRedirect} />, 'success')
      }
   }

   // navigate to cart when redirect state is true
   // close modal and set false to redirect state when component unmount
   useEffect(() => {
      if (redirect) navigate('/cart')

      return () => {
         closeSwal()
         setRedirect(false)
      }
   }, [redirect, navigate])

   return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
         {wishlist.map((product: IProduct) => (
            <div key={product.id} className='bg-zinc-50 h-[525px] p-8 relative rounded-md'>
               <div className='absolute top-2 right-2 cursor-pointer' onClick={() => handleFavorite(product)}>
                  <TrashIcon className='w-6 h-6' />
               </div>
               <Link to={`/products/${product.id}`}>
                  <img src={product.image} alt='ecommerce' className='w-full block aspect-video max-w-[250px] max-h-[275px] h-full mx-auto mix-blend-multiply' />
               </Link>
               <Link to={`/products/${product.id}`} className='mt-10 mb-1 text-base text-left font-semibold h-6 line-clamp-1 overflow-hidden'>{product.title}</Link>
               <p className='text-sm mb-3'>{product.category}</p>
               <div className='font-semibold text-left mb-6'>${product.price.toFixed(2)}</div>
               <Button variant='filled' color='indigo' size='sm' className='w-full h-11' onClick={() => handleAddToCart(product)}>Add to cart</Button>
            </div>
         ))}
      </div>
   )
}

export default WishlistProducts