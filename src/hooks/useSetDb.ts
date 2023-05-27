import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase/index'
import { useState } from 'react'


export const useSetDb = (name: string, data: any) => {
   const [loading, setLoading] = useState<boolean>(false)
   const [error, setError] = useState<any>('')

   const setItem = async () => {
      setLoading(true)
      try {
         const docRef = await addDoc(collection(db, name), data)
         setLoading(false)
      } catch (error) {
         const errorMessage = 'error adding document: ' + error
         setError(errorMessage)
         setLoading(false)
      }
   }

   return {loading, error, setItem}
}