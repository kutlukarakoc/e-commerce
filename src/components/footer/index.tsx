import Contents from './contents'
import BottomRight from './bottomRight'
import logo from '../../assets/logo.png'

const Footer: React.FC = () => {
   return (
      <footer className="min-h-72 flex flex-col justify-evenly gap-4 sm:gap-10 py-4 border-t border-solid border-gray-500">
         <div className="flex flex-col sm:flex-row gap-4 justify-around items-center px-2 pt-6 pb-2">
            <div className='w-32 h-32 sm:w-40 sm:h-40 flex items-center'>
               <img src={logo} alt="ecommerce" className='w-full block' />
            </div>
            <Contents />
         </div>
         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-8">
            <div className="text-xs order-2 sm:order-1">© 2023 E Commerce, Inc. All rights reserved.</div>
            <BottomRight />
         </div>
      </footer>
   )
}

export default Footer