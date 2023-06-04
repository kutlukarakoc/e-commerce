import { items } from '../../constants/footer/footerConstants'
import { Link } from 'react-router-dom'

const Contents = () => {
   return (
      <div className='flex flex-wrap gap-9 sm:gap-24 pb-4 sm:pb-0'>
         {items.map((item, index) => (
            <div key={index} className='flex flex-col gap-2'>
               <h4 className='text-base mb-2'>{item.title}</h4>
               {item.links.map((link, index) => (
                  <Link key={index} to={link.path} className='text-sm'>{link.title}</Link>
               ))}
            </div>
         ))}
      </div>
   )
}

export default Contents