import { DetailedHTMLProps, memo } from 'react'

interface ITitle extends DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
   cypressAttr?: string
}

const Title: React.FC<ITitle> = ({ cypressAttr, children, className }) => {

   const initialTitleClasses = 'mt-10 text-center text-2xl sm:text-3xl font-semibold text-gray-700'

   return (
      <h2
         data-cy={cypressAttr ? cypressAttr : null}
         className={`${initialTitleClasses} ${className}`}
      >
         {children}
      </h2>
   )
}

export default memo(Title)