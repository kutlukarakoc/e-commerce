import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchProductById } from '../../store/features/singleProduct'
import { HeartIcon } from '@heroicons/react/24/outline'
import Button from '../../components/ui/button'
import Rating from '../../components/ui/rating'
import Accordion from '../../components/ui/accordion'
import { shippingConstants, returnsConstants } from '../../constants/product/accordionConstants'

const Product: React.FC = () => {

   /* getting productId from URL */
   const { productId } = useParams()

   const { product, loading, error } = useAppSelector(state => state.product)

   const dispatch = useAppDispatch()

   useEffect(() => {
      dispatch(fetchProductById(Number(productId)))
   }, [productId])

   return (
      <section className='container mx-auto my-24 grid grid-cols-1 md:grid-cols-2 gap-8 2xl:gap-0 px-4 sm:px-0'>
         {
            product && (<>
               <div className='bg-zinc-50 rounded-md max-w-xl h-[350px] sm:h-[600px] flex justify-center items-center w-full mx-auto'>
                  <img src={product.image} alt={product.title} className='block w-3/4 h-3/4 max-h-full rounded-md mix-blend-multiply' />
               </div>
               <div>
                  <h1 className='text-3xl sm:text-4xl font-bold mb-3 text-center md:text-left'>{product.title}</h1>
                  <h3 className='text-2xl sm:text-3xl font-semibold mb-3'>${product.price}</h3>
                  <div className='mb-6 flex items-center gap-4 text-lg'>
                     <Rating rate={product.rating.rate} />
                     <div className='text-sm'>{product.rating.rate} out of {product.rating.count}</div>
                  </div>
                  <p className='text-base tracking-wide mb-6 first-letter:uppercase'>{product.description}</p>
                  <div className='flex gap-6'>
                     <Button type='button' variant='filled' color='indigo' size='xl' className='px-6 py-3 font-semibold leading-5'>
                        Add to cart
                     </Button>
                     <div className='w-10'>
                        <HeartIcon className='w-full h-full' />
                        {/* <HeartIcon className='w-full h-full text-red-500 fill-red-500'/> */}
                     </div>
                  </div>
                  <div className='mt-16'>
                     <Accordion title={shippingConstants.title} contents={shippingConstants.contents} />
                     <div className='my-5 border-t border-solid border-gray-500 w-full h-1'></div>
                     <Accordion title={returnsConstants.title} contents={returnsConstants.contents} />
                  </div>
               </div>
            </>
            )
         }
      </section>
   )
}

export default Product