import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
   type: string
   name: string
   placeholder?: string
   label?: string
   error?: string | null
}

const Input: React.FC<InputProps> = ({ onChange, type, name, placeholder, label, error, ...rest }) => {

   return (
      <div className='w-full'>
         {label && <label htmlFor={name} className='block text-sm font-medium leading-6 text-gray-700 mb-1.5'>{label}</label>}
         <input
            onChange={onChange}
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            className={'outline-none text-gray-700 w-full border border-gray-300 rounded-md px-4 py-1 text-sm placeholder:text-gray-500 focus:border-indigo-600 h-10'}
            {...rest}
         />
         {error && <p className='mt-1 text-xs text-red-500'>{error}</p>}
      </div>
   )
}

export default Input