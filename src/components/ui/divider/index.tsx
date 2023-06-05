interface IDivider {
   styles?: string
   variant?: 'soft' | 'normal'
}

const Divider: React.FC<IDivider> = ({styles, variant}) => {

   let variantColor: string
   if(variant === 'soft') {
      variantColor = 'border-gray-300'
   } else {
      variantColor = 'border-gray-500'
   }

   return <div className={`border-t border-solid w-full h-1 my-5 ${styles} ${variantColor}` }></div>
}

export default Divider