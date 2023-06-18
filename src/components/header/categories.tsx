import { Link } from 'react-router-dom'
import { categories } from '../../constants/header/headerConstants'

interface ICategories {
   cypressAttr?: string
   className?: string
}

const Categories: React.FC<ICategories> = ({ cypressAttr, className }) => {
   return (
      <>
         {categories.map((category, index) => (
            <Link data-cy={cypressAttr} key={index} to={category.path} className={className}>{category.title}</Link>
         ))}
      </>
   )
}

export default Categories