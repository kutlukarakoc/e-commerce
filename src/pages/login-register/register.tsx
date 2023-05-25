import Input from '../../components/ui/input'
import Label from '../../components/ui/label'
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline'
import Button from '../../components/ui/button'

const Register = () => {
   return (
      <div className='border-l border-solid border-gray-500 bg-gray-100 w-full'>
         <div className='flex min-h-full flex-1 flex-col justify-center'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
               <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-700'>
                  Register
               </h2>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
               <form className='space-y-6' action='#' method='POST'>
                  <div>
                     <Label text='Email Address' htmlfor='register-email' />
                     <Input name='register-email' type='email' inputPlaceholder='example@mail.com' wrapperStyles='h-9' inputStyles='focus:border-indigo-600' required />
                  </div>

                  <div>
                     <Label text='Password' htmlfor='register-password' />
                     <Input name='register-password' type='password' inputPlaceholder='******' wrapperStyles='h-9' inputStyles='focus:border-indigo-600' required />
                  </div>

                  <Button type='submit' variant='filled' size='sm' color='indigo' className='px-3 py-2 w-full'>Register</Button>
               </form>

               <div className='mt-10 text-center text-sm text-gray-500 flex items-center justify-center gap-2'>
                  <ArrowLongLeftIcon className='w-6 h-6 text-indigo-600' />
                  <span>Already have an account?</span>
                  <div className='flex justify-center items-center text-indigo-600 gap-2'>
                     Sign in!
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Register