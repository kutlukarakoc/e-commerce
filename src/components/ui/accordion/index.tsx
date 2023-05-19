import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

interface IAccordion {
   title: string
   contents: string[]
}

const Accordion: React.FC<IAccordion> = ({ title, contents }) => {

   // state to watch accordion toggle status
   const [toggle, setToggle] = useState<boolean>(false)

   // accordion toggle classes
   let accordionToggleClass;
   if (toggle) {
      accordionToggleClass = 'h-20'
   } else {
      accordionToggleClass = 'h-0 overflow-hidden'
   }

   return (
      <>
         <h3 className='flex justify-between items-center mb-4'>
            <button onClick={() => setToggle(prev => !prev)} className='cursor-pointer flex justify-between items-center w-full'>
               <span className={toggle ? 'text-indigo-500' : ''}>{title}</span>
               {!toggle ? <PlusIcon className='w-7 h-7' /> : <MinusIcon className='w-7 h-7' />}
            </button>
         </h3>
         <div className={'w-full ' + accordionToggleClass}>
            <ul className='list-inside'>
               {contents.map((content, index) => (
                  <li key={index} className='ps-4 text-sm relative before:absolute before:left-0 before:top-2/4 before:-translate-y-2/4 be before:content[""] before:w-[5px] before:h-[5px] before:rounded-full before:bg-gray-500'>{content}</li>
               ))}
            </ul>
         </div>
      </>
   )
}

export default Accordion