import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/index'
import { useState } from 'react'


export const useFirestore = () => {
   const [loading, setLoading] = useState<boolean>(false)
   const [error, setError] = useState<any>('')

   const setItem = async (collection: string, uid: string, data: any) => {
      setLoading(true)
      try {
         await setDoc(doc(db, collection, uid), data)
         setLoading(false)
      } catch (error) {
         const errorMessage = 'error adding document: ' + error
         setError(errorMessage)
         setLoading(false)
      }
   }

   const updateItem = async (collection: string, uid: string, data: any) => {
      setLoading(true)
      try {
         await updateDoc(doc(db, collection, uid), data)
         setLoading(false)
      } catch (error) {
         const errorMessage = 'error updating document: ' + error
         setError(errorMessage)
         setLoading(false)
      }
   }

   return {loading, error, setItem, updateItem}
}