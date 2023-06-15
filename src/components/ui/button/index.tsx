import { ButtonHTMLAttributes } from 'react'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
   click?: () => void
   variant: 'filled' | 'outline'
   size: 'sm' | 'md' | 'lg'
   color: 'indigo' | 'red'
}

const Button: React.FC<IButton> = ({ children, variant, color, size, click, ...rest }) => {

   // defining variant and colour classes
   let variantStyles = ''
   if (variant === 'filled') {
      variantStyles =
         color === 'indigo'
            ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
            : 'bg-red-600 hover:bg-red-500 text-white'
   } else { // variant outline
      variantStyles =
         color === 'indigo'
            ? 'border border-solid border-indigo-600 text-indigo-600'
            : 'border border-solid border-red-600 text-red-600'
   }

   // defining font size class
   let fontSize = ''
   if (size === 'sm') {
      fontSize = 'text-sm'
   } else if (size === 'md') {
      fontSize = 'text-base'
   } else { // lg 
      fontSize = 'text-lg'
   }

   // clone rest props except className
   const { className: restClassName, ...restWithoutClass } = rest;

   return (
      <button
         data-cy='btn-component'
         className={`pointer-events-auto rounded-md disabled:opacity-75 disabled:cursor-not-allowed ${variantStyles} ${fontSize} ${rest.className}`}
         onClick={click}
         {...restWithoutClass}
      >
         {children}
      </button>
   )
}

export default Button
