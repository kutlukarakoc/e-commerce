import Input from '../../components/ui/input'
import Label from '../../components/ui/label'
import Button from '../../components/ui/button'
import Title from './title'
import { useState } from 'react'

interface IRegister {
   displayLogin: () => void
}

interface IForm {
   registerFullname: string
   registerBirthdate: string
   registerEmail: string
   registerPassword: string
}

const Register: React.FC<IRegister> = ({ displayLogin }) => {

   // keep track of the form's data as the user enters it
   const [form, setForm] = useState<IForm>({registerFullname: '', registerBirthdate: '', registerEmail: '', registerPassword: ''})

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
      setForm({...form, [name]: value})
   }

   const handleRegisterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      console.log('form', form)
   }

   return (
      <div className='border-l border-solid border-gray-300 bg-gray-100 w-full h-full'>
         <div className='flex min-h-full flex-1 flex-col justify-center'>
            <Title text='Register' />

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
               <form className='px-8 lg:px-0' onSubmit={handleRegisterSubmit}>
                  <div className='mb-6'>
                     <Input name='registerFullname' label='Fullname' type='text' placeholder='Michael Jackson' required onChange={handleInputChange} />
                  </div>
                  <div className='mb-6'>
                     <Input name='registerBirthdate' label='Birthdate' type='text' placeholder='mm/dd/yy' required onChange={handleInputChange} />
                  </div>
                  <div className='mb-6'>
                     <Input name='registerEmail' label='Email Address' type='email' placeholder='example@mail.com' required onChange={handleInputChange} />
                  </div>
                  <div className='mb-10'>
                     <Input name='registerPassword' label='Password' type='password' placeholder='******' required onChange={handleInputChange} />
                  </div>
                  <Button type='submit' variant='filled' size='sm' color='indigo' className='px-3 py-2 w-full'>Register</Button>
               </form>

               <div className='mt-10 text-center text-sm text-gray-500'>
                  <div>Already have an account?</div>
                  <div className='text-indigo-600 cursor-pointer hover:text-indigo-500 lg:cursor-default lg:hover:text-indigo-600' onClick={displayLogin}>
                     &larr; Sign in!
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Register