import Input from '../../components/ui/input'
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

   const handleResetPassword = async () => {
      if (email) await resetPassword(email)
   }

   return (
      <div className='relative'>
         <Input name='password' label='Password' type='password' value='******' error={resetPasswordError} readOnly />
         <div className='text-xs text-indigo-600 hover:text-indigo-500 cursor-pointer absolute top-1 right-1' onClick={handleResetPassword}>{resetPasswordText}</div>
      </div>
   )
}

export default Password