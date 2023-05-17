import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import { heroBanners } from '../../../constants/home/heroBanners'

const HeroSection = () => {

   const heroSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000
   }

   return (
      <section className='mb-40'>
         <Slider {...heroSettings}>
            {heroBanners.map((banner, index) => (
               <div className='h-[550px]'>
                  <Link key={index} to={banner.path} className='h-full'>
                     <img src={banner.img} alt="ecommerce" className='w-full block aspect-video max-w-full h-full' />
                  </Link>
               </div>
            ))}
         </Slider>
      </section>
   )
}

export default HeroSection