import Divider from '../../components/ui/divider'
import NotFound from '../../components/not-found'
import Favorite from '../../components/ui/favorite'
import Button from '../../components/ui/button'
import Rating from '../../components/ui/rating'
import Accordion from '../../components/ui/accordion'
import LoadingSkeleton from './loading'
import ProductAdded from '../../components/popup/productAdded'
import { shippingConstants, returnsConstants } from '../../constants/product/accordionConstants'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { fetchProductById } from '../../store/features/singleProduct'
import { clearProduct } from '../../store/features/singleProduct'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCart } from '../../hooks/useCart'
import { IProduct } from '../../types/productsTypes'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom'

const Product: React.FC = () => {

   // swal generator
   const MySwal = withReactContent(Swal)

   const dispatch = useAppDispatch()
   const navigate = useNavigate()

   // keep track of navigate from view cart button in popup
   const [redirect, setRedirect] = useState<boolean>(false)
   // getting productId from URL
   const { productId } = useParams()
   // getting current visited product from redux product state
   const { product, loading, error } = useAppSelector(state => state.product)
   // getting user from redux store
   const { user } = useAppSelector(state => state.auth)
   // gettin cart loading state and method from custom hook
   const { cartLoading, cartError, handleCart } = useCart()

   // fetch current product by product id
   useEffect(() => {
      dispatch(fetchProductById(Number(productId)))

      // clean product state when component unmount
      return () => {
         dispatch(clearProduct())
      }
   }, [productId])

   // add to cart and show popup
   const handleClick = (product: IProduct) => {
      if (user?.uid) {
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
      } else {
         navigate('/auth')
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

   if (error || (!loading && !product)) {
      return <NotFound title='Product not found' text='Sorry, we couldn’t find the product you’re looking for.' link='/' />
   }

   return (
      <>
         {loading && !product
            ? <LoadingSkeleton />
            : (
               <section className='container mx-auto my-24 grid grid-cols-1 md:grid-cols-2 gap-8 2xl:gap-0 px-4 sm:px-0'>
                  {product && (
                     <>
                        <div className='bg-zinc-50 rounded-md max-w-xl h-[350px] sm:h-[600px] flex justify-center items-center w-full mx-auto'>
                           <img src={product.image} alt={product.title} className='block w-3/4 h-3/4 max-h-full rounded-md mix-blend-multiply' />
                        </div>
                        <div className='max-w-[700px]'>
                           <h1 className='text-3xl sm:text-4xl font-bold mb-3 text-center md:text-left'>{product.title}</h1>
                           <h3 className='text-2xl sm:text-3xl font-semibold mb-3'>${product.price}</h3>
                           <div className='mb-6 flex items-center gap-4 text-lg'>
                              <Rating rate={product.rating.rate} />
                              <div className='text-sm'>{product.rating.rate} out of {product.rating.count}</div>
                           </div>
                           <p className='text-base tracking-wide mb-6 first-letter:uppercase'>{product.description}</p>
                           <div className='flex gap-6'>
                              <Button type='button' variant='filled' color='indigo' size='md' className='px-6 py-3 font-semibold leading-5' onClick={() => handleClick(product)}>
                                 Add to cart
                              </Button>
                              <Favorite className='w-10' product={product} />
                           </div>
                           <div className='mt-16'>
                              <Accordion title={shippingConstants.title} contents={shippingConstants.contents} type='list' />
                              <Divider />
                              <Accordion title={returnsConstants.title} contents={returnsConstants.contents} type='list' />
                           </div>
                        </div>
                     </>
                  )}
               </section>
            )}
      </>
   )
}

export default Product