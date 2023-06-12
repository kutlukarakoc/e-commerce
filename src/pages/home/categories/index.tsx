import { Link } from 'react-router-dom'
import { categoriesBanners } from '../../../constants/home/categoriesBanners'

const CategoriesSection: React.FC = () => {
   return (
      <section className='container px-4 sm:px-0 grid grid-cols-1 md:grid-cols-2 mx-auto gap-4 mb-32'>
         {categoriesBanners.map((banner, index) => (
            <Link key={index} to={banner.path} className='w-full h-72 sm:h-[350px]'>
               <img data-cy='banner' src={banner.img} alt='ecommerce' className='h-full w-full' />
            </Link>
         ))}
      </section>
   )
}

export default CategoriesSection