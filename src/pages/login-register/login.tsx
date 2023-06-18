import Input from '../../components/ui/input'
import Button from '../../components/ui/button'
import Title from '../../components/title'
import Spinner from '../../components/ui/spinner'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { login } from '../../store/features/auth'
import { useFirestore } from '../../hooks/useFirestore'
import { Formik } from 'formik'
import { loginValidations } from '../../yup-validations/loginValidation'

interface ILogin {
   displayRegister: () => void
   loginTransform: string | undefined
}

interface ILoginValues {
   loginEmail: string
   loginPassword: string
}

const Login: React.FC<ILogin> = ({ displayRegister, loginTransform }) => {

   const dispatch = useAppDispatch()
   const navigate = useNavigate()

   // state that specifies whether to show the password
   const [showPassword, setShowPassword] = useState<boolean>(false)
   // getting states and signin method from useAuth custom hook
   const { loading, error, signin } = useAuth()

   // update method from useFirestore custom hook
   const { updateItem } = useFirestore()

   // make signin request and set user state, if success navigate to home
   const handleLogin = async (values: ILoginValues) => {
      // signin request using custom useAuth hook
      const response = await signin(values.loginEmail, values.loginPassword)
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
         navigate('/profile')
      }
   }

   return (
      <div className={'bg-white flex w-full min-h-full flex-1 flex-col justify-center z-10 absolute lg:relative transition-transform duration-300 ' + loginTransform}>
         <Title>Sign in to your account</Title>
         <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <Formik
               initialValues={{ loginEmail: '', loginPassword: '' }}
               validationSchema={loginValidations}
               onSubmit={(values: ILoginValues) => { handleLogin(values) }}
            >
               {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                  <form data-cy='login-form' className='px-4 sm:px-0' onSubmit={handleSubmit}>
                     <div className='mb-3 h-24'>
                        <Input
                           data-cy='login-email'
                           name='loginEmail'
                           label='Email Address'
                           type='email'
                           placeholder='example@mail.com'
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.loginEmail}
                           error={(touched.loginEmail && errors.loginEmail) ? errors.loginEmail : null}
                        />
                     </div>
                     <div className='mb-10 h-24 relative'>
                        <Input
                           data-cy='login-password'
                           name='loginPassword'
                           label='Password'
                           type={showPassword ? 'text' : 'password'}
                           placeholder='******'
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.loginPassword}
                           error={(touched.loginPassword && errors.loginPassword) ? errors.loginPassword : null}
                        />
                        {showPassword
                           ? <EyeIcon className='w-5 h-5 absolute top-[42%] right-5 cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
                           : <EyeSlashIcon className='w-5 h-5 absolute right-5 top-[42%] cursor-pointer' onClick={() => setShowPassword(!showPassword)} />}
                     </div>
                     <Button disabled={loading} type='submit' variant='filled' size='md' color='indigo' className='w-56 h-11 flex justify-center items-center gap-4 mx-auto disabled:opacity-75 disabled:cursor-not-allowed'>
                        Sign in {loading && <Spinner />}
                     </Button>
                  </form>
               )}
            </Formik>
            {/* Display firestore erros if its exists */}
            {error && <p className='text-center mt-5 text-sm text-red-500'>{error}</p>}
            <div className='mt-10 text-center text-sm text-gray-500'>
               <span>Not a member?</span>
               <div className='text-indigo-600 cursor-pointer hover:text-indigo-500 lg:cursor-default lg:hover:text-indigo-600' onClick={displayRegister}>
                  Register &rarr;
               </div>
            </div>
         </div>
      </div >
   )
}

export default Login