import Input from '../../components/ui/input'
import Spinner from '../../components/ui/spinner'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

interface IPassword {
   email: string | undefined
}

const Password: React.FC<IPassword> = ({ email }) => {

   // get states and methods from useAuth custom hook
   const { resetPasswordLoading, resetPasswordError, resetPassword } = useAuth()
   // reset password text
   const [resetPasswordText, setResetPasswordText] = useState<string>('Reset Password')
   // keep track of mail sent or not
   const [isMailSent, setIsMailSent] = useState<boolean>(false)

   const handleResetPassword = async () => {
      if (email) {
         await resetPassword(email)
         setResetPasswordText('Email sent!')
         setIsMailSent(true)
      }
   }

   return (
      <div className='relative'>
         <Input name='password' label='Password' type='password' value='******' error={resetPasswordError} style={{cursor: 'not-allowed'}} readOnly />
         {resetPasswordLoading && <div className='absolute bottom-2 right-2'><Spinner /></div>}
         <button className={`text-xs ${isMailSent ? 'text-indigo-500 cursor-default' : 'text-indigo-600 cursor-pointer hover:text-indigo-500'} absolute top-1 right-1`} onClick={handleResetPassword} disabled={isMailSent}>{resetPasswordText}</button>
      </div>
   )
}

export default Password