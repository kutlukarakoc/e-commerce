interface IRadio {
   name: string
   options: any
   selected: string
   onChange?: (e: any) => void
}

const Radio: React.FC<IRadio> = ({ name, options, selected, onChange, ...rest }) => {
   console.log('selected',selected)
   return (
      <>
         {options.map((option: any) => (
            <div key={option.value} className='flex items-center gap-x-3'>
               <input type='radio' id={option.value} name={name} className='peer sr-only' value={option.value} checked={selected === option.value} onChange={onChange} {...rest} />
               <label htmlFor={option.value} className='relative pl-7 text-sm font-medium leading-6 text-gray-600 peer-checked:text-indigo-600 flex items-center justify-center gap-3 after:contents[""] after:w-[18px] after:h-[18px] after:border after:border-solid after:border-grey-500 peer-checked:after:border-indigo-600 after:rounded-full after:absolute after:left-0 before:contents[""] before:w-3 before:h-3 peer-checked:before:bg-indigo-600 before:rounded-full before:absolute before:left-[3px]'>
                  {option.label}
               </label>
            </div>
         ))}
      </>
   )
}

export default Radio