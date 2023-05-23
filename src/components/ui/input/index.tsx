import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   name: string
   label?: string
   change?: (event: React.FormEvent<HTMLInputElement>) => void
   placeholder: string
   wrapperStyles?: string
   inputStyles?: string
   pattern?: string
}

const Input: React.FC<InputProps> = ({ name, label, placeholder, wrapperStyles, inputStyles, change, ...rest }) => {

   return (
      <div className={'input-wrapper relative w-full ' + wrapperStyles}>
         {label && <label htmlFor={name}>{label}</label>}
         <input
            id={name}
            name={name}
            className={'peer outline-none h-full text-gray-700 w-full border border-gray-500 rounded px-4 py-1 text-sm valid:border-indigo-600 ' + inputStyles}
            onChange={change}
            {...rest}
         />
         <span className='absolute text-sm text-gray-400 whitespace-nowrap left-2 translate-x-2 top-1/2 -translate-y-1/2 transition-all peer-valid:text-xs peer-valid:text-indigo-600 peer-valid:top-0 peer-valid:bg-white peer-valid:-translate-x-0'>
            {placeholder}
         </span>
      </div>
   )
}

export default Input