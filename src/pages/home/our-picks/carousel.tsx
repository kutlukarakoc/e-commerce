import Slider from 'react-slick'
import { IProduct } from '../../../types/productsTypes'
import { Link } from 'react-router-dom'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'

interface ICarousel {
   products: IProduct[]
}

const Carousel: React.FC<ICarousel> = ({ products }) => {

   // generating custom carousel next arrow
   const NextArrow = (props: any) => {
      const { className, style, onClick } = props
      return (
         <div
            className={className + ' w-8 h-8 sm:w-10 sm:h-10 absolute top-1/2 right-8 sm:right-1 -translate-y-1/2 z-10'}
            style={{ color: 'unset' }}
            onClick={onClick}
         >
            <ArrowLongRightIcon />
         </div>
      )
   }
   // generating custom carousel prev arrow
   const PrevArrow = (props: any) => {
      const { className, style, onClick } = props
      return (
         <div
            className={className + ' w-8 h-8 sm:w-10 sm:h-10 absolute top-1/2 left-7 sm:left-1 -translate-y-1/2 z-10'}
            style={{ color: 'unset' }}
            onClick={onClick}
         >
            <ArrowLongLeftIcon />
         </div>
      )
   }
   // carousel settings
   const ourPicksSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      arrows: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
         {
            breakpoint: 1024,
            settings: { slidesToShow: 2 }
         },
         {
            breakpoint: 670,
            settings: { slidesToShow: 1 }
         }
      ]
   }

   return (
      <Slider {...ourPicksSettings}>
         {products.map(product => (
            <div key={product.id} className='h-64'>
               <div className='h-full w-48 sm:w-60 block mx-auto'>
                  <img src={product.image} alt='ecommerce' className='w-full block aspect-video max-w-full h-full' />
                  <h3 className='mt-10 mb-1 text-base font-semibold h-6 line-clamp-1 overflow-hidden'>{product.title}</h3>
                  <p className='text-sm mb-3'>{product.category}</p>
                  <div className='flex justify-between px-4 w-full'>
                     <div className='font-semibold'>${product.price.toFixed(2)}</div>
                     <Link to={`/products/${product.id}`} className='underline text-xs'>Visit</Link>
                  </div>
               </div>
            </div>
         ))}
      </Slider>
   )
}

export default Carousel