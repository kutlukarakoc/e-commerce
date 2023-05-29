import { deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
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

   const deleteItem = async (collection: string, uid: string) => {
      setLoading(true)
      try {
         await deleteDoc(doc(db, collection, uid))
         setLoading(false)
      } catch (error) {
         const errorMessage = 'error deleting document: ' + error
         setError(errorMessage)
         setLoading(false)
      }
   }

   const getItem = async (collection: string, uid: string) => {
      setLoading(true)
      try {
         const docSnap = await getDoc(doc(db, collection, uid))
         if (docSnap.exists()) {
            console.log('document data: ', docSnap.data())
            return docSnap.data()
         } else {
            console.log('No such document!')
         }
         setLoading(false)
      } catch (error) {
         const errorMessage = 'error getting document: ' + error
         setError(errorMessage)
         setLoading(false)
      }
   }

   return { loading, error, setItem, updateItem, deleteItem, getItem }
}