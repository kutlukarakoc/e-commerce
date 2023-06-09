import Button from '../../components/ui/button'
import { Link } from 'react-router-dom'

interface INotFound {
   title: string
   text?: string
   link: string
   linkText: string
   isErrorCode?: boolean
}

const NotFound: React.FC<INotFound> = ({title, text, link, linkText, isErrorCode = true}) => {
   return (
      <section className='grid min-h-full place-items-center bg-white px-6 py-5 sm:py-8 lg:px-8'>
         <div className='text-center'>
            <p className='text-base font-semibold text-indigo-600'>{isErrorCode ? '404' : null}</p>
            <h1 className='mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>{title}</h1>
            <p className='mt-6 text-base leading-7 text-gray-600'>{text}</p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
               <Link to={link}>
                  <Button size='sm' variant='filled' color='indigo' className='px-3.5 py-2.5 font-semibold leading-5'>{linkText}</Button>
               </Link>
            </div>
         </div>
      </section>
   )
}

export default NotFound