import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import Input from '../../components/ui/input'
import Label from '../../components/ui/label'
import Button from '../../components/ui/button'
import Title from './title'

const Login: React.FC = () => {
   return (
      <div className="flex min-h-full flex-1 flex-col justify-center">
         <Title text='Sign in to your account' />

         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form>
               <div className='mb-6'>
                  <Label text='Email Address' htmlfor='login-mail' />
                  <Input name='login-email' type='email' inputPlaceholder='example@mail.com' wrapperStyles='h-11' inputStyles='focus:border-indigo-600' required />
               </div>

               <div className='mb-10'>
                  <div className="flex items-center justify-between">
                     <Label text='Password' htmlfor='login-password' />
                     <div className="text-sm">
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                           Forgot password?
                        </a>
                     </div>
                  </div>
                  <Input name='login-password' type='password' inputPlaceholder='******' wrapperStyles='h-11' inputStyles='focus:border-indigo-600' required />
               </div>

               <Button type='submit' variant='filled' size='sm' color='indigo' className='px-3 py-2 w-full inline-block'>Sign in</Button>
            </form>

            <div className="mt-10 text-center text-sm text-gray-500 flex justify-center items-center gap-2">
               <span>Not a member?</span>
               <div className='flex justify-center items-center text-indigo-600 gap-2'>
                  Register
                  <ArrowLongRightIcon className='w-6 h-6' />
               </div>
            </div>
         </div>
      </div>
   )
}

export default Login