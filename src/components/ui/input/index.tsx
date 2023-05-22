import { InputHTMLAttributes, useState, useRef } from 'react'


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   name: string
   label?: string
   type: string
   onchange?: (value: string) => void
   placeholder: string
   wrapperStyles?: string
   inputStyles?: string
}

const Input: React.FC<InputProps> = ({ type, name, label, placeholder, wrapperStyles, inputStyles, ...rest }) => {

   const [isFocused, setIsFocused] = useState<boolean>(false);
   const inputRef = useRef<HTMLInputElement | null>(null);

   const handleSpanClick = () => {
      setIsFocused(true);
      if (inputRef.current) {
         inputRef.current.focus();
      }
   };

   return (
      <div className={'input-wrapper relative w-full ' + wrapperStyles}>
         {label && <label htmlFor={name}>{label}</label>}
         <input
            ref={inputRef}
            type={type}
            id={name}
            {...rest}
            className={'peer outline-none h-full text-gray-700 w-full border border-gray-500 rounded px-2 py-1 text-sm' + (isFocused ? ' focus:border-indigo-600' : '') + ' ' + inputStyles}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
         />
         <span
            className={
               'absolute text-sm whitespace-nowrap left-0 translate-x-2 top-1/2 -translate-y-1/2 transition-all' +
               (isFocused ? ' peer-focus:text-xs peer-focus:text-indigo-600 peer-focus:top-0 peer-focus:bg-white' : '')
            }
            onClick={handleSpanClick}
         >
            {placeholder}
         </span>
      </div>
   )
}

export default Input