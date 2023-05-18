import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import { heroBanners } from '../../../constants/home/heroBanners'
import './style.css'

const HeroSection = () => {

   const heroSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      arrows: false
   }

   return (
      <section className='hero-section mb-32'>
         <Slider {...heroSettings}>
            {heroBanners.map((banner, index) => (
               <div key={index} className='h-[450px] sm:h-[625px]'>
                  <Link key={index} to={banner.path} className='h-full'>
                     <img src={banner.img} alt='ecommerce' className='w-full block aspect-video max-w-full h-full' />
                  </Link>
               </div>
            ))}
         </Slider>
      </section>
   )
}

export default HeroSection