import Button from '../../components/ui/button'
import Divider from '../../components/ui/divider'
import LoadingSkeleton from './loading'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useWishlist } from '../../hooks/useWishlist'
import { useAppSelector } from '../../store/hooks'
import { useState, useEffect } from 'react'
import { IProduct } from '../../types/productsTypes'

const Favorites = () => {

   // get logged in user information from redux store
   const { user } = useAppSelector(state => state.auth)
   // keep track of wishlist
   const [wishlist, setWishlist] = useState([])
   // keep track of wishlist loading status
   const [loading, setLoading] = useState<boolean>(false)
   // manage wishlist with custom hook
   const handleWishlist = useWishlist()

   // remove product from wishlist
   const handleClick = async (product: IProduct) => {
      if (user?.uid) {
         const currentWishlist = await handleWishlist(user.uid, product, 'delete')
         setWishlist(currentWishlist)
      }
   }

   // get wishlist from custom hook and set to wishlist state and set loading status
   const getWishlist = async () => {
      setLoading(true)
      if (user?.uid) {
         const currentWishlist = await handleWishlist(user.uid)
         setWishlist(currentWishlist)
         setLoading(false)
      }
   }

   // get wishlist initially
   useEffect(() => {
      getWishlist()
   }, [])

   if (loading) {
      return <LoadingSkeleton />
   }

   return (
      <div className='container mx-auto my-20 flex-1'>
         <h1 className='text-lg font-semibold'>My Wishlist ({wishlist.length} products)</h1>
         <Divider />
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>

            {wishlist.map((product: IProduct) => (
               <div key={product.id} className='bg-zinc-50 h-[525px] p-8 relative rounded'>
                  <div className='absolute top-2 right-2 cursor-pointer' onClick={() => handleClick(product)}><TrashIcon className='w-6 h-6' /></div>
                  <Link to={`/products/${product.id}`}>
                     <img src={product.image} alt='ecommerce' className='w-full block aspect-video max-w-[250px] max-h-[275px] h-full mx-auto mix-blend-multiply' />
                  </Link>
                  <Link to={`/products/${product.id}`} className='mt-10 mb-1 text-base text-left font-semibold h-6 line-clamp-1 overflow-hidden'>{product.title}</Link>
                  <p className='text-sm mb-3'>{product.category}</p>
                  <div className='font-semibold text-left mb-6'>${product.price.toFixed(2)}</div>
                  <Button variant='filled' color='indigo' size='sm' className='w-full h-11'>Add to cart</Button>
               </div>
            ))}
         </div>
      </div>
   )
}

export default Favorites