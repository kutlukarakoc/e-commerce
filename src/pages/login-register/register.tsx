import Input from '../../components/ui/input'
import Label from '../../components/ui/label'
import Button from '../../components/ui/button'
import Title from './title'

const Register = () => {
   return (
      <div className='border-l border-solid border-gray-500 bg-gray-100 w-full'>
         <div className='flex min-h-full flex-1 flex-col justify-center'>
            <Title text='Register' />

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
               <form>
                  <div className='mb-6'>
                     <Label text='Fullname' htmlfor='register-fullname' />
                     <Input name='register-fullname' type='text' inputPlaceholder='Michael Jackson' wrapperStyles='h-10' inputStyles='focus:border-indigo-600' required />
                  </div>
                  <div className='mb-6'>
                     <Label text='Birthdate' htmlfor='register-birthdate' />
                     <Input name='register-birthdate' type='text' inputPlaceholder='mm/dd/yy' wrapperStyles='h-10' inputStyles='focus:border-indigo-600' required />
                  </div>
                  <div className='mb-6'>
                     <Label text='Email Address' htmlfor='register-email' />
                     <Input name='register-email' type='email' inputPlaceholder='example@mail.com' wrapperStyles='h-10' inputStyles='focus:border-indigo-600' required />
                  </div>
                  <div className='mb-10'>
                     <Label text='Password' htmlfor='register-password' />
                     <Input name='register-password' type='password' inputPlaceholder='******' wrapperStyles='h-10' inputStyles='focus:border-indigo-600' required />
                  </div>

                  <Button type='submit' variant='filled' size='sm' color='indigo' className='px-3 py-2 w-full'>Register</Button>
               </form>

               <div className='mt-10 text-center text-sm text-gray-500'>
                  <div>Already have an account?</div>
                  <div className='text-indigo-600 cursor-pointer hover:text-indigo-500'>
                     &larr; Sign in!
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Register