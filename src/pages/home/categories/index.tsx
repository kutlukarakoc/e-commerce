import { Link } from 'react-router-dom'
import { categoriesBanners } from '../../../constants/home/categoriesBanners'

const CategoriesSection = () => {
   return (
      <section className='container grid grid-cols-2 grid-rows-2 mx-auto gap-4 mb-40'>
         {categoriesBanners.map((banner, index) => (
            <Link key={index} to={banner.path} className='w-full h-[350px]'>
               <img src={banner.img} alt="ecommerce" className='h-full w-full' />
            </Link>
         ))}
      </section>
   )
}

export default CategoriesSection