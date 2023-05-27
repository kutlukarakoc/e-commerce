import { InputHTMLAttributes, useRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   change?: (event: React.ChangeEvent<HTMLInputElement>) => void
   type: string
   name: string
   placeholder: string
   label?: string
   error?: string
}

const Input: React.FC<InputProps> = ({ change, type, name, placeholder, label, error, ...rest }) => {

   return (
      <div className='w-full h-10'>
         {label && <label htmlFor={name} className='block text-sm font-medium leading-6 text-gray-700 mb-1.5'>{label}</label>}
         <input
            onChange={change}
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            className={'outline-none h-full text-gray-700 w-full border border-gray-500 rounded px-4 py-1 text-sm valid:border-indigo-600 placeholder:text-gray-500 focus:border-indigo-600'}
            {...rest}
         />
         {error && <p className='error'>{error}</p>}
      </div>
   )
}

export default Input