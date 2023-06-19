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
      if (!verifierError && !verifierLoading) {
         setVerifyMailText('Email verification has been sent. You will be redirected to the login page shortly. Please confirm your account by clicking the link in the email that has been sent and proceed to log in.')
         setTimeout(() => {
            dispatch(logout())
            navigate('/auth')
         }, 7000)
      }

      if (verifierError) {
         setVerifyMailText('Something went wrong. Please try again later.')
      }
   }

   return (
      <div data-cy='verify-email' className='bg-gray-400 hover:bg-gray-500 text-center text-white max-w-max mx-auto py-3 px-4 flex justify-center items-center gap-4 mb-10 rounded-md cursor-pointer' onClick={handleVerifyMail}>
         {verifierLoading ? <Spinner /> : <EnvelopeIcon className='w-8 h-8 sm:w-6 sm:h-6' />} <p data-cy='verify-text' className='w-10/12'>{verifierError ? verifierError : verifyMailText}</p>
      </div>
   )
}

export default VerifyEmail