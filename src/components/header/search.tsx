import Input from '../ui/input'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { FormEvent } from 'react'

interface ISearch {
   handleSubmit: (event: FormEvent<HTMLFormElement>) => void
   setInputValue: (value: React.SetStateAction<string>) => void
   inputValue: string
   formClasses: string
   formCypressAttr: string
   inputCypressAttr: string
   name: string
}

const Search: React.FC<ISearch> = ({ handleSubmit, setInputValue, inputValue, formClasses, formCypressAttr, inputCypressAttr, name }) => {

   const initialFormClasses = 'relative'

   return (
      <form data-cy={formCypressAttr} className={`${formClasses} ${initialFormClasses}`} onSubmit={handleSubmit}>
         <Input
            data-cy={inputCypressAttr}
            type='text'
            name={name}
            placeholder='Search products'
            value={inputValue}
            autoComplete='off'
            pattern='.+'
            required
            onChange={e => setInputValue(e.target.value)}
         />
         <button type='submit' className='absolute right-3 top-1/2 -translate-y-1/2'>
            <MagnifyingGlassIcon className='w-5 h-5' />
         </button>
      </form>
   )
}

export default Search