import { useEffect, useState, useRef } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { ISelect, ISelectList } from '../../../types/selectTypes'

const Select: React.FC<ISelect> = ({ title, contents, click, initialTitle }) => {

   // keep track of selected option
   const [selected, setSelected] = useState<ISelectList>({ title: title })
   // keep track of whether the show contents or not
   const [open, setOpen] = useState<boolean>(false)
   // ref of container element of component
   const selectRef = useRef<HTMLDivElement>(null)

   // set selected option, close contents, execute additional function that given as props if exists
   const handleOptionClick = (content: ISelectList) => {
      setSelected(content)
      setOpen(false)

      click && click(content)
   }

   // close contents when click outside of component
   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setOpen(false)
         }
      }

      document.addEventListener('mousedown', handleClickOutside)
      // remove event when component unmount
      return () => document.removeEventListener('mousedown', handleClickOutside)
   }, [])

   // initial select title based on url
   useEffect(() => {
      if (initialTitle) setSelected({ title: initialTitle })
   }, [initialTitle])

   return (
      <div data-cy='container' ref={selectRef} className={`w-48 font-medium text-sm relative cursor-pointer ${!open ? 'h-15' : ''}`}>
         {/* Select header */}
         <div
            data-cy='toggle'
            onClick={() => setOpen(prevOpen => !prevOpen)}
            className='bg-white w-full p-2 flex items-center justify-between rounded-md border border-solid border-gray-300'
         >
            <span data-cy='selected' className={(selected && selected.title !== title) ? 'text-indigo-600' : ''}>{selected ? selected.title : title}</span>
            <ChevronDownIcon className={`w-5 h-5 ${open && ' rotate-180'}`} />
         </div>
         <ul data-cy='content-wrapper' className={`bg-white mt-2 rounded-md overflow-y-auto w-48 absolute z-10 shadow-md ${open ? 'max-h-40' : 'max-h-0'} `}>
            {selected && selected.title !== title && (
               // Default select option
               <li className='p-2 text-xs hover:bg-indigo-600 hover:text-white' onClick={() => handleOptionClick({ title })}>
                  {title}
               </li>
            )}

            {/* Render select options */}
            {contents.map((content, index) => (
               <li key={index}
                  data-cy='content'
                  className={`p-2 text-xs hover:bg-indigo-600 hover:text-white ${content.title === selected.title && 'bg-indigo-600 text-white'}`}
                  onClick={() => handleOptionClick(content)}
               >
                  {content?.title}
               </li>
            ))}
         </ul>
      </div>
   )
}

export default Select