import { AiFillGithub, AiFillLinkedin, AiOutlineInstagram } from 'react-icons/ai'
import { SiLeetcode } from 'react-icons/si'

interface IFooterLinks {
   icon: JSX.Element
   link: string
}

const BottomRight = () => {

   const footerLinks: IFooterLinks[] = [
      { icon: <AiFillGithub size={24} />, link: 'https://github.com/kutlukarakoc' },
      { icon: <AiFillLinkedin size={24} />, link: 'https://www.linkedin.com/in/taha-kutlu-karako%C3%A7-6939b0146/' },
      { icon: <AiOutlineInstagram size={24} />, link: 'https://www.instagram.com/kutlukrkc/' },
      { icon: <SiLeetcode size={24} />, link: 'https://leetcode.com/kutlukarakoc/' },
   ]

   return (
      <div className='flex gap-4 order-1 sm:order-2'>
         {footerLinks.map((item: IFooterLinks, index) => (
            <a key={index} href={item.link} target='_blank' rel="noreferrer">
               {item.icon}
            </a>
         ))}
      </div>
   )
}

export default BottomRight