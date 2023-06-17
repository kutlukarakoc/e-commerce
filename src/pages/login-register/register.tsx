import Input from '../../components/ui/input'
import Button from '../../components/ui/button'
import Title from './title'
import Spinner from '../../components/ui/spinner'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useAppDispatch } from '../../store/hooks'
import { login } from '../../store/features/auth'
import { useNavigate } from 'react-router-dom'
import { useFirestore } from '../../hooks/useFirestore'
import { Formik } from 'formik'
import { registerValidations } from '../../yup-validations/registerValidation'

interface IRegister {
   displayLogin: () => void
}

interface IRegisterValues {
   registerName: string
   registerSurname: string
   registerEmail: string
   registerPassword: string
}

const Register: React.FC<IRegister> = ({ displayLogin }) => {

   const dispatch = useAppDispatch()
   const navigate = useNavigate()

   // state that specifies whether to show the password
   const [showPassword, setShowPassword] = useState<boolean>(false)
   // getting states and register method from useAuth custom hook
   const { loading, error, register } = useAuth()

   // set method from useFirestore custom hook
   const { setItem } = useFirestore()

   // make register request and set user state, if success navigate to home
   const handleRegister = async (values: IRegisterValues) => {
      // register request using custom useAuth hook
      const response = await register(values.registerEmail, values.registerPassword)
      if (response) {
         // destructing properties from response
         const { email, emailVerified, phoneNumber, photoURL, uid, metadata } = response
         // destructing properties from response.metadata
         const { creationTime, lastSignInTime } = metadata
         // generating payload for user state
         const payload = { email, emailVerified, phoneNumber, photoURL, uid, metadata: { creationTime, lastSignInTime } }
         // set payload to user auth.state
         dispatch(login(payload))
         // set user to db
         await setItem('users', uid, {
            name: values.registerName,
            surname: values.registerSurname,
            email,
            emailVerified,
            phoneNumber,
            photoURL,
            uid,
            gender: null,
            birthday: null,
            metadata: {
               creationTime,
               lastSignInTime
            }
         })
         await setItem('wishlist', uid, { products: [] })
         await setItem('cart', uid, { items: [] })
         // navigate to profile page
         navigate('/profile')
      }
   }

   return (
      <div className='border-l border-solid border-gray-300 bg-gray-100 w-full h-full'>
         <div className='flex min-h-full flex-1 flex-col justify-center'>
            <Title text='Register' />
            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
               <Formik
                  initialValues={{ registerName: '', registerSurname: '', registerEmail: '', registerPassword: '' }}
                  validationSchema={registerValidations}
                  onSubmit={(values: IRegisterValues) => { handleRegister(values) }}
               >
                  {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                     <form className='px-4 lg:px-0' onSubmit={handleSubmit}>
                        <div className='mb-1 h-24 grid grid-cols-2 gap-2'>
                           <Input
                              name='registerName'
                              label='Name'
                              type='text'
                              placeholder='Michael'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.registerName}
                              error={(touched.registerName && errors.registerName) ? errors.registerName : null}
                           />
                           <Input
                              name='registerSurname'
                              label='Surname'
                              type='text'
                              placeholder='Jackson'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.registerSurname}
                              error={(touched.registerSurname && errors.registerSurname) ? errors.registerSurname : null}
                           />
                        </div>
                        <div className='mb-1 h-24'>
                           <Input
                              name='registerEmail'
                              label='Email Address'
                              type='email'
                              placeholder='example@mail.com'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.registerEmail}
                              error={(touched.registerEmail && errors.registerEmail) ? errors.registerEmail : null}
                           />
                        </div>
                        <div className='mb-10 h-24 relative'>
                           <Input
                              name='registerPassword'
                              label='Password'
                              type={showPassword ? 'text' : 'password'}
                              placeholder='******'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.registerPassword}
                              error={(touched.registerPassword && errors.registerPassword) ? errors.registerPassword : null}
                           />
                           {showPassword
                              ? <EyeIcon className='w-5 h-5 absolute top-[42%] right-5 cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
                              : <EyeSlashIcon className='w-5 h-5 absolute top-[42%] right-5 cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
                           }
                        </div>
                        <Button disabled={loading} type='submit' variant='filled' size='md' color='indigo' className='w-52 h-11 flex justify-center items-center gap-4 mx-auto disabled:opacity-75 disabled:cursor-not-allowed'>
                           Register
                           {loading && <Spinner />}
                        </Button>
                     </form>
                  )}
               </Formik>
               {/* Display firestore erros if its exists */}
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