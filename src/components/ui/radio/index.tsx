interface IRadio {
   name: string
   id: string
   label: string
   onChange?: (e: any) => void
}

const Radio: React.FC<IRadio> = ({name, id, label, onChange, ...rest}) => {
   return (
      <div className='flex items-center gap-x-3'>
         <input id={id} name={name} type='radio' className='peer sr-only' onChange={onChange} {...rest}/>
         <label htmlFor={id} className='relative pl-7 text-sm font-medium leading-6 text-gray-600 peer-checked:text-indigo-600 flex items-center justify-center gap-3 after:contents[""] after:w-[18px] after:h-[18px] after:border after:border-solid after:border-grey-500 peer-checked:after:border-indigo-600 after:rounded-full after:absolute after:left-0 before:contents[""] before:w-3 before:h-3 peer-checked:before:bg-indigo-600 before:rounded-full before:absolute before:left-[3px]'>
            {label}
         </label>
      </div>
   )
}

export default Radio