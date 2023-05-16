import { InputHTMLAttributes } from "react"


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   name: string
   label?: string
   type: string
   onchange?: (value: string) => void
}

const Input: React.FC<InputProps> = ({type, name, label, ...rest}) => {
   return (
      <div className='input-wrapper'>
         {label && <label htmlFor={name}></label>}
         <input 
            type={type} 
            id={name} 
            {...rest} 
            style={{
               outline: 'none'
            }}
         />
      </div>
   )
}

export default Input