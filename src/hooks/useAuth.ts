import { useState } from 'react'
import { auth } from '../firebase/index'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export const useAuth = () => {
   const [loading, setLoading] = useState<boolean>(false)
   const [error, setError] = useState<string | null>(null)

   const register = async (email: string, password: string) => {
      setLoading(true)
      try {
         const { user } = await createUserWithEmailAndPassword(auth, email, password)
         setLoading(false)
         return user
      } catch (error: any) {
         setLoading(false)
         if (error.message.indexOf('auth/email-already-in-use') > -1) {
            setError('This email is already registered.')
         } else if (error.message.indexOf('auth/weak-password') > -1) {
            setError('Password should be at least 6 characters.')
         } else {
            setError('Something went wrong. Please try again later.')
         }
      }
   }

   return { loading, error, register }
}