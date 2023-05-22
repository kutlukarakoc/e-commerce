import { useEffect, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { ISelect, ISelectList } from '../../../types/selectTypes'

const Select: React.FC<ISelect> = ({ title, contents, click, initialTitle }) => {

   const [selected, setSelected] = useState<ISelectList>({ title: title })
   const [open, setOpen] = useState<boolean>(false)

   const handleClick = (content: ISelectList) => {
      setSelected(content)
      setOpen(false)

      click && click(content)
   }

   // initial select title based on url
   useEffect(() => {
      if (initialTitle) setSelected({ title: initialTitle })
   }, [initialTitle])

   return (
      <div className={`w-44 font-medium text-sm relative ${!open && 'h-15'}`}>
         {/* Select header */}
         <div
            onClick={() => setOpen(!open)}
            className={'bg-white w-full p-2 flex items-center justify-between rounded'}
         >
            <span className={(selected && selected.title !== title) ? 'text-indigo-600' : ''}>{selected ? selected.title : title}</span>
            <ChevronDownIcon className={`w-5 h-5 ${open && ' rotate-180'}`} />
         </div>
         <ul className={`bg-white mt-2 overflow-y-auto w-44 absolute z-10 shadow-md ${open ? 'max-h-40' : 'max-h-0'} `}>
            {selected && selected.title !== title && (
               // Default select option
               <li className='p-2 text-xs hover:bg-indigo-600 hover:text-white' onClick={() => handleClick({ title })}>
                  {title}
               </li>
            )}

            {/* Render select options */}
            {contents.map((content, index) => (
               <li key={index}
                  className={`p-2 text-xs hover:bg-indigo-600 hover:text-white ${content.title === selected.title && 'bg-indigo-600 text-white'}`}
                  onClick={() => handleClick(content)}
               >
                  {content?.title}
               </li>
            ))}
         </ul>
      </div>
   )
}

export default Select