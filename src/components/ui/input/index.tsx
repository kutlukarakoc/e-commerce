import { InputHTMLAttributes } from 'react'


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
   return (
      <div className={'input-wrapper relative w-full ' + wrapperStyles}>
         {label && <label htmlFor={name}>{label}</label>}
         <input
            type={type}
            id={name}
            {...rest}
            className={'peer outline-none h-full text-gray-700 w-full border border-gray-500 rounded px-2 py-1 text-sm focus:border-indigo-600 ' + inputStyles} />
         <span className='absolute text-sm whitespace-nowrap left-0 translate-x-2 top-1/2 -translate-y-1/2 transition-all peer-focus:text-xs peer-focus:text-indigo-600 peer-focus:top-0 peer-focus:bg-white'>{placeholder}</span>
      </div>
   )
}

export default Input