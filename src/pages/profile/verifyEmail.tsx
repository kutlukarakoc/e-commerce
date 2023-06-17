import Spinner from '../../components/ui/spinner'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useAppDispatch } from '../../store/hooks'
import { logout } from '../../store/features/auth'
import { useNavigate } from 'react-router-dom'
import { EnvelopeIcon } from '@heroicons/react/24/outline'

const VerifyEmail: React.FC = () => {

   const dispatch = useAppDispatch()
   const navigate = useNavigate()

   // get states and methods from useAuth custom hook
   const { verifierLoading, verifierError, emailVerification } = useAuth()
   // verify email text
   const [verifyMailText, setVerifyMailText] = useState<string>('Please verify your email address by clicking here.')

   // sent email verification message navigate to auth page after 3 secs
   const handleVerifyMail = async () => {
      await emailVerification()
      setVerifyMailText('Email verification sent! You are redirected to the login page. Please login again after opening the confirmation link sent to your e-mail.')
      setTimeout(() => {
         dispatch(logout())
         navigate('/auth')
      }, 5000)
   }

   return (
      <div className='bg-gray-400 hover:bg-gray-500 text-center text-white w-full max-w-sm sm:max-w-md mx-auto h-12 sm:h-10 p-4 flex justify-center items-center gap-4 mb-10 rounded-md cursor-pointer' onClick={handleVerifyMail}>
         {verifierLoading ? <Spinner /> : <EnvelopeIcon className='w-8 h-8 sm:w-6 sm:h-6' />} {verifierError ? verifierError : verifyMailText}
      </div>
   )
}

export default VerifyEmail