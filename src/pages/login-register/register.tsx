import Input from '../../components/ui/input'
import Button from '../../components/ui/button'
import Title from './title'
import Spinner from '../../components/ui/spinner'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { IForm } from '../../types/authFormTypes'
import { useAuth } from '../../hooks/useAuth'
import { useAppDispatch } from '../../store/hooks'
import { login } from '../../store/features/auth'
import { useNavigate } from 'react-router-dom'

interface IRegister {
   displayLogin: () => void
}

const Register: React.FC<IRegister> = ({ displayLogin }) => {

   // keep track of the form's data as the user enters it
   const [form, setForm] = useState<IForm>({ registerFullname: '', registerEmail: '', registerPassword: '' })
   // state that specifies whether to show the password
   const [showPassword, setShowPassword] = useState<boolean>(false)

   // getting states and register method from useAuth custom hook
   const { loading, error, register } = useAuth()

   const dispatch = useAppDispatch()

   const navigate = useNavigate()

   // update the form state with input values
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
      setForm({ ...form, [name]: value })
   }

   // make register request and set user state, if success navigate to home
   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      // register request using custom useAuth hook
      const response = await register(form.registerEmail, form.registerPassword)
      if (response) {
         // destructing properties from response
         const { email, emailVerified, phoneNumber, photoURL, uid, metadata } = response
         // destructing properties from response.metadata
         const { creationTime, lastSignInTime } = metadata
         // generating payload for user state
         const payload = { email, emailVerified, phoneNumber, photoURL, uid, metadata: { creationTime, lastSignInTime } }
         // set payload to user auth.state
         dispatch(login(payload))
         // navigate to home page
         navigate('/')
      }
   }

   return (
      <div className='border-l border-solid border-gray-300 bg-gray-100 w-full h-full'>
         <div className='flex min-h-full flex-1 flex-col justify-center'>
            <Title text='Register' />

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
               <form className='px-8 lg:px-0' onSubmit={handleSubmit}>
                  <div className='mb-6'>
                     <Input name='registerFullname' label='Fullname' type='text' placeholder='Michael Jackson' onChange={handleChange} required value={form.registerFullname} />
                  </div>
                  <div className='mb-6'>
                     <Input name='registerEmail' label='Email Address' type='email' placeholder='example@mail.com' onChange={handleChange} required value={form.registerEmail} />
                  </div>
                  <div className='mb-10 relative'>
                     <Input name='registerPassword' label='Password' type={showPassword ? 'text' : 'password'} placeholder='******' onChange={handleChange} required value={form.registerPassword} />
                     {
                        showPassword
                           ? <EyeIcon className='w-5 h-5 absolute top-[55%] right-5 cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
                           : <EyeSlashIcon className='w-5 h-5 absolute top-[55%] right-5 cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
                     }
                  </div>
                  <Button disabled={loading} type='submit' variant='filled' size='md' color='indigo' className='w-52 h-11 flex justify-center items-center gap-4 mx-auto disabled:opacity-75 disabled:cursor-not-allowed'>
                     Register
                     {loading && <Spinner />}
                  </Button>
               </form>

               {error && <p className='text-center mt-5 text-sm text-red-500'>{error}</p>}

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