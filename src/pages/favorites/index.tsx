import Button from '../../components/ui/button'
import Divider from '../../components/ui/divider'
import ProductAdded from '../../components/popup/productAdded'
import LoadingSkeleton from './loading'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useWishlist } from '../../hooks/useWishlist'
import { useCart } from '../../hooks/useCart'
import { useAppSelector } from '../../store/hooks'
import { IProduct } from '../../types/productsTypes'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Favorites = () => {

   // swal generator
   const MySwal = withReactContent(Swal)

   const navigate = useNavigate()

   // keep track of navigate from view cart button in popup
   const [redirect, setRedirect] = useState<boolean>(false)

   const { wishlist } = useAppSelector(state => state.wishlist)

   // manage wishlist with custom hook
   const { handleWishlist, wishlistLoading, wishlistError } = useWishlist()
   // getting method from custom hook
   const { handleCart, cartError, cartLoading } = useCart()

   // remove product from wishlist
   const handleFavorite = async (product: IProduct) => {
      await handleWishlist(product, 'delete')
   }

   // add to cart and show popup
   const handleAddToCart = async (product: IProduct) => {
      handleCart('add', product, 1)
      if (!cartLoading && !cartError) {
         MySwal.fire({
            icon: 'success',
            html: <ProductAdded product={product} setRedirect={setRedirect} />,
            showConfirmButton: false,
            showCloseButton: true,
            customClass: {
               closeButton: 'hover:text-gray-700 shadow-none border-0 outline-0 focus:outline-0 focus:shadow-none'
            }
         })
      }
   }

   // navigate to cart when redirect state is true, after close modal
   // set false to redirect state when component unmount
   useEffect(() => {
      if (redirect) {
         navigate('/cart')
         MySwal.close()
      }

      return () => setRedirect(false)
   }, [redirect, MySwal, navigate])

   if (wishlistLoading) {
      return <LoadingSkeleton />
   }

   return (
      <div className='container mx-auto my-20 flex-1'>
         <h1 className='text-3xl font-semibold'>My Wishlist ({wishlist.length} products)</h1>
         <Divider variant='soft' />
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>

            {wishlist.map((product: IProduct) => (
               <div key={product.id} className='bg-zinc-50 h-[525px] p-8 relative rounded-md'>
                  <div className='absolute top-2 right-2 cursor-pointer' onClick={() => handleFavorite(product)}><TrashIcon className='w-6 h-6' /></div>
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
      </div>
   )
}

export default Favorites