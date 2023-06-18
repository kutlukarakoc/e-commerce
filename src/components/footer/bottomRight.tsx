import { memo } from 'react'
import { footerLinks } from '../../constants/footer/bottomRightConstants'

const BottomRight: React.FC = () => {
   return (
      <div className='flex gap-4 order-1 sm:order-2'>
         {footerLinks.map((item, index) => {
            const Icon = item.icon
            return (
               <a key={index} href={item.link} target='_blank' rel="noreferrer">
                  <Icon size={24} />
               </a>
            )
         })}
      </div>
   )
}

export default memo(BottomRight)