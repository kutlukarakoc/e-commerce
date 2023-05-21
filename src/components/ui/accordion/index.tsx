import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline'

interface IAccordion {
   title: string
   contents: IAccordionList[]
   type: 'list' | 'links'
   click?: () => void
}

interface IAccordionList {
   title: string
   path?: string
}

const Accordion: React.FC<IAccordion> = ({ title, contents, type, click }) => {
   const [toggle, setToggle] = useState(false)

   // Handler function to toggle the accordion
   const handleToggle = () => {
      setToggle(prevToggle => !prevToggle)
   }

   // Helper function to render the content
   const renderContent = () => {
      if (type === 'list') {
         // Render content for list type
         return contents.map((content, index) => (
            <li
               key={index}
               onClick={click}
               className="ps-4 text-sm relative before:absolute before:left-0 before:top-2/4 before:-translate-y-2/4 before:content[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-gray-500"
            >
               {content.title}
            </li>
         ))
      }

      // Render content for links type
      return contents.map((content, index) => (
         <li key={index} className="text-sm" onClick={click}>
            {content.path ? (
               <Link to={content.path}>{content.title}</Link>
            ) : (
               <span onClick={click}>{content.title}</span>
            )}
         </li>
      ))
   }

   // Determine the class based on the toggle state
   const accordionToggleClass = toggle ? 'h-20' : 'h-0 overflow-hidden'

   return (
      <>
         <h3 className="flex justify-between items-center mb-4">
            {/* Button to trigger the toggle handler */}
            <button onClick={handleToggle} className="cursor-pointer flex justify-between items-center w-full">
               <span className={toggle ? 'text-indigo-500' : ''}>{title}</span>
               {/* Plus or minus icon based on the toggle state */}
               {toggle ? <MinusIcon className="w-7 h-7" /> : <PlusIcon className="w-7 h-7" />}
            </button>
         </h3>
         <div className={`w-full ${accordionToggleClass}`}>
            {/* <ul> that contains the rendered content */}
            <ul className="list-inside">{renderContent()}</ul>
         </div>
      </>
   )
}

export default Accordion