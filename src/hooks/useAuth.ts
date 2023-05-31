import { useState } from 'react'
import { auth } from '../firebase/index'
import { createUserWithEmailAndPassword, deleteUser, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateEmail } from 'firebase/auth'

export const useAuth = () => {
   const [loading, setLoading] = useState<boolean>(false)
   const [error, setError] = useState<string | null>(null)
   const [verifierLoading, setVerifierLoading] = useState<boolean>()
   const [verifierError, setVerifierError] = useState<string | null>(null)
   const [resetPasswordLoading, setResetPasswordLoading] = useState<boolean>()
   const [resetPasswordError, setResetPasswordError] = useState<string | null>(null)
   const [deleteUserLoading, setDeleteUserLoading] = useState<boolean>(false)
   const [deleteUserError, setDeleteUserError] = useState<string | null>(null)

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

   const signin = async (email: string, password: string) => {
      setLoading(true)
      try {
         const { user } = await signInWithEmailAndPassword(auth, email, password)
         console.log('user',user)
         setLoading(false)
         return user
      } catch (error: any) {
         setLoading(false)
         if (error.message.indexOf('auth/user-not-found') > -1) {
            setError('User not found.')
         } else if (error.message.indexOf('auth/wrong-password') > -1) {
            setError('The password you entered is incorrect. Please try again.')
         } else {
            setError('Something went wrong. Please try again later.')
         }
      }
   }

   const deleteUserAcc = async () => {
      setDeleteUserLoading(true)
      try {
         const user = auth.currentUser
         if (user) {
            await deleteUser(user)
         }
         setDeleteUserLoading(false)
      } catch (error: any) {
         setDeleteUserLoading(false)
         setDeleteUserError('Something went wrong. Please try again later.')
      }
   }

   const emailVerification = async () => {
      setVerifierLoading(true)
      try {
         const user = auth.currentUser
         if (user) {
            await sendEmailVerification(user)
         }
         setVerifierLoading(false)
      } catch (error: any) {
         setVerifierLoading(false)
         setVerifierError('Something went wrong. Please try again later.')
         console.log(error.message)
      }
   }

   const changeEmail = async (email: string) => {
      try {
         const user = auth.currentUser
         if (user) {
            await updateEmail(user, email)
         }
      } catch (error: any) {
         console.log(error.message)
      }
   }

   const resetPassword = async (email: string) => {
      setResetPasswordLoading(true)
      try {
         const response = await sendPasswordResetEmail(auth, email)
         console.log('resetpw', response)
         setResetPasswordLoading(false)
      } catch (error: any) {
         setResetPasswordLoading(false)
         setResetPasswordError('Something went wrong. Please try again later.')
         console.log(error.message)
      }
   }

   return { loading, error, verifierLoading, verifierError, resetPasswordLoading, resetPasswordError, deleteUserLoading, deleteUserError, register, signin, deleteUserAcc, emailVerification, changeEmail, resetPassword }
}