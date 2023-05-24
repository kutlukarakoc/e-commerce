import { IButton } from '../../../types/buttonTypes'

const Button: React.FC<IButton> = ({ children, variant, color, size, click, ...rest }) => {

   // defining variant and colour classes
   let variantAndColor = ''
   if (variant === 'filled') {
      if (color === 'indigo') {
         variantAndColor = 'bg-indigo-600 hover:bg-indigo-500 text-white'
      }
   } else if (variant === 'outline') {
      if (color === 'indigo') {
         variantAndColor = 'border border-solid border-indigo-600 text-indigo-600'
      }
   }

   // defining size classes
   let sizeStyles = ''
   if (size === 'xs') {
      sizeStyles = 'text-xs'
   } else if (size === 'sm') {
      sizeStyles = 'text-sm'
   } else if (size === 'md') {
      sizeStyles = 'text-base'
   } else if (size === 'lg') {
      sizeStyles = 'text-lg'
   } else if (size === 'xl') {
      sizeStyles = 'text-xl'
   } else {
      sizeStyles = 'text-2xl'
   }

   // clone rest props except className
   const restWithoutClass = { ...rest }
   delete restWithoutClass.className

   return (
      <button
         className={
            'pointer-events-auto rounded-md '
            + variantAndColor + ' '
            + sizeStyles + ' '
            + rest.className
         }
         onClick={click}
         {...restWithoutClass}
      >
         {children}
      </button>
   )
}

export default Button