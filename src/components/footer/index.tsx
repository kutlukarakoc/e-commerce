import { AiFillGithub, AiFillLinkedin, AiOutlineInstagram } from 'react-icons/ai'
import { SiLeetcode } from 'react-icons/si'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { items } from '../../constants/footer/footerConstants'

const Footer: React.FC = () => {
   return (
      <footer className="min-h-72 flex flex-col justify-evenly gap-4 sm:gap-10 py-4 border-t border-solid border-gray-500">
         <div className="flex flex-col sm:flex-row gap-4 justify-around items-center px-2 pt-6 pb-2">
            <div className='w-32 h-32 sm:w-40 sm:h-40 flex items-center'>
               <img src={logo} alt="ecommerce" className='w-full block' />
            </div>
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
         </div>
         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-8">
            <div className="text-xs order-2 sm:order-1">© 2023 E Commerce, Inc. All rights reserved.</div>
            <div className='flex gap-4 order-1 sm:order-2'>
               <a href='https://github.com/kutlukarakoc' target='_blank'>
                  <AiFillGithub size={24} />
               </a>
               <a href='https://www.linkedin.com/in/taha-kutlu-karako%C3%A7-6939b0146/' target='_blank'>
                  <AiFillLinkedin size={24} />
               </a>
               <a href='https://www.instagram.com/kutlukrkc/' target='_blank'>
                  <AiOutlineInstagram size={24} />
               </a>
               <a href='https://leetcode.com/kutlukarakoc/' target='_blank'>
                  <SiLeetcode size={24} />
               </a>
            </div>
         </div>
      </footer>
   )
}

export default Footer