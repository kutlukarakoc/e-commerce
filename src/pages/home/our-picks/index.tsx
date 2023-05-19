
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { fetchLimitedProducts } from '../../../store/features/multipleProducts'
import { useEffect } from 'react'
import './style.css'
import Carousel from './carousel'
import LoadingSkeleton from './loading'

const OurPicks: React.FC = () => {

   const { products, loading, error } = useAppSelector(state => state.products)
   const dispatch = useAppDispatch()

   // get 10 products on first component mount
   useEffect(() => {
      dispatch(fetchLimitedProducts(10))
   }, [])

   return (
      <>
         {
            !error && (
               <section className='ourpicks-section container mx-auto mb-32'>
                  <h2 className='text-3xl text-center mb-14 tracking-wider font-semibold'>Our Picks For You</h2>
                  {
                     !loading && products.length
                        ? <Carousel products={products} />
                        : <LoadingSkeleton />
                  }
               </section>
            )
         }
      </>
   )
}

export default OurPicks