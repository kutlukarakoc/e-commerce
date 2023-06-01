import Input from '../../components/ui/input'
import Button from '../../components/ui/button'
import Title from './title'
import Spinner from '../../components/ui/spinner'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { login } from '../../store/features/auth'
import { useFirestore } from '../../hooks/useFirestore'

interface ILogin {
   displayRegister: () => void
   loginTransform: string | undefined
}

const Login: React.FC<ILogin> = ({ displayRegister, loginTransform }) => {

   // state that specifies whether to show the password
   const [showPassword, setShowPassword] = useState<boolean>(false)
   // keep track of the form's data as the user enters it
   const [form, setForm] = useState<{ loginEmail: string, loginPassword: string }>({ loginEmail: '', loginPassword: '' })

   // getting states and signin method from useAuth custom hook
   const { loading, error, signin } = useAuth()
   // update method from useFirestore custom hook
   const { updateItem } = useFirestore()

   const dispatch = useAppDispatch()

   const navigate = useNavigate()

   // update the form state with input values
   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
      setForm({ ...form, [name]: value })
   }

   // make signin request and set user state, if success navigate to home
   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      // signin request using custom useAuth hook
      const response = await signin(form.loginEmail, form.loginPassword)
      if (response) {
         // destructing properties from response
         const { email, emailVerified, phoneNumber, photoURL, uid, metadata } = response
         // destructing properties from response.metadata
         const { creationTime, lastSignInTime } = metadata
         // generating payload for user state
         const payload = { email, emailVerified, phoneNumber, photoURL, uid, metadata: { creationTime, lastSignInTime } }
         // set payload to user auth.state
         dispatch(login(payload))
         // update email verified data in firestore
         await updateItem('users', uid, { emailVerified })
         // navigate to home page
         navigate('/')
      }
   }

   return (
      <div className={'bg-white flex w-full min-h-full flex-1 flex-col justify-center z-10 absolute lg:relative transition-transform duration-300 ' + loginTransform}>
         <Title text='Sign in to your account' />

         <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <form className='px-8 sm:px-0' onSubmit={handleSubmit}>
               <div className='mb-6'>
                  <Input name='loginEmail' label='Email Address' type='email' placeholder='example@mail.com' onChange={handleInputChange} required />
               </div>
               <div className='mb-10 relative'>
                  <Input name='loginPassword' label='Password' type={showPassword ? 'text' : 'password'} placeholder='******' onChange={handleInputChange} required />
                  {showPassword
                     ? <EyeIcon className='w-5 h-5 absolute top-[55%] right-5 cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
                     : <EyeSlashIcon className='w-5 h-5 absolute top-[55%] right-5 cursor-pointer' onClick={() => setShowPassword(!showPassword)} />}
               </div>

               <Button disabled={loading} type='submit' variant='filled' size='md' color='indigo' className='w-56 h-11 flex justify-center items-center gap-4 mx-auto disabled:opacity-75 disabled:cursor-not-allowed'>
                  Sign in
                  {loading && <Spinner />}
               </Button>
            </form>

            {error && <p className='text-center mt-5 text-sm text-red-500'>{error}</p>}

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