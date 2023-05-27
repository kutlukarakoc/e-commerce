import Input from '../../components/ui/input'
import Button from '../../components/ui/button'
import Title from './title'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

interface ILogin {
   displayRegister: () => void
   loginTransform: string | undefined
}

const Login: React.FC<ILogin> = ({ displayRegister, loginTransform }) => {

   // state that specifies whether to show the password
   const [showPassword, setShowPassword] = useState<boolean>(false)

   return (
      <div className={'bg-white flex w-full min-h-full flex-1 flex-col justify-center z-10 absolute lg:relative transition-transform duration-300 ' + loginTransform}>
         <Title text='Sign in to your account' />

         <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <form className='px-8 sm:px-0'>
               <div className='mb-6'>
                  <Input name='loginEmail' label='Email Address' type='email' placeholder='example@mail.com' required />
               </div>
               <div className='mb-10 relative'>
                  <Input name='loginPassword' label='Password' type={showPassword ? 'text' : 'password'} placeholder='******' required />
                  {
                     showPassword
                        ? <EyeIcon className='w-5 h-5 absolute top-[55%] right-5 cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
                        : <EyeSlashIcon className='w-5 h-5 absolute top-[55%] right-5 cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
                  }
               </div>

               <Button type='submit' variant='filled' size='sm' color='indigo' className='px-3 py-2 w-full inline-block'>Sign in</Button>
            </form>

            <div className='mt-10 text-center text-sm text-gray-500'>
               <span>Not a member?</span>
               <div className='text-indigo-600 cursor-pointer hover:text-indigo-500 lg:cursor-default lg:hover:text-indigo-600' onClick={displayRegister}>
                  Register &rarr;
               </div>
            </div>
         </div>
      </div>
   )
}

export default Login