import { InputHTMLAttributes, useRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   name: string
   change?: (event: React.FormEvent<HTMLInputElement>) => void
   placeholder?: string
   wrapperStyles?: string
   inputStyles?: string
   pattern?: string
   inputPlaceholder?: string
}

const Input: React.FC<InputProps> = ({ name, placeholder, inputPlaceholder, wrapperStyles, inputStyles, change, ...rest }) => {

   const inputRef = useRef<HTMLInputElement | null>(null);

   const handleSpanClick = () => {
      if (inputRef.current) {
         inputRef.current.focus();
      }
   };

   return (
      <div className={'input-wrapper relative w-full ' + wrapperStyles}>
         <input
            id={name}
            name={name}
            className={'peer outline-none h-full text-gray-700 w-full border border-gray-500 rounded px-4 py-1 text-sm valid:border-indigo-600 placeholder:text-gray-500 ' + inputStyles}
            onChange={change}
            ref={inputRef}
            placeholder={inputPlaceholder}
            {...rest}
         />
         <span className='absolute text-sm text-gray-500 whitespace-nowrap left-2 translate-x-2 top-1/2 -translate-y-1/2 transition-all peer-valid:text-xs peer-valid:text-indigo-600 peer-valid:top-0 peer-valid:bg-white peer-valid:-translate-x-0' onClick={handleSpanClick}>
            {placeholder}
         </span>
      </div>
   )
}

export default Input