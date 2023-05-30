import { deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/index'
import { useState } from 'react'

export const useFirestore = () => {
   // setter states
   const [loading, setLoading] = useState<boolean>(false)
   const [error, setError] = useState<any>('')
   // getter states
   const [getterLoading, setGetterLoading] = useState<boolean>(false)
   const [getterError, setGetterError] = useState<string | null>(null)
   // updater states
   const [updaterLoading, setUpdaterLoading] = useState<boolean>(false)
   const [updaterError, setUpdaterError] = useState<string | null>(null)
   // delete states
   const [removerLoading, setRemoverLoading] = useState<boolean>(false)
   const [removerError, setremoveRError] = useState<string | null>(null)

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
      setUpdaterLoading(true)
      try {
         await updateDoc(doc(db, collection, uid), data)
         setUpdaterLoading(false)
      } catch (error) {
         const errorMessage = 'error updating document: ' + error
         setUpdaterError(errorMessage)
         setUpdaterLoading(false)
      }
   }

   const deleteItem = async (collection: string, uid: string) => {
      setRemoverLoading(true)
      try {
         await deleteDoc(doc(db, collection, uid))
         setRemoverLoading(false)
      } catch (error) {
         const errorMessage = 'error deleting document: ' + error
         setremoveRError(errorMessage)
         setRemoverLoading(false)
      }
   }

   const getItem = async (collection: string, uid: string) => {
      setGetterLoading(true)
      try {
         const docSnap = await getDoc(doc(db, collection, uid))
         if (docSnap.exists()) {
            setGetterLoading(false)
            return docSnap.data()
         } else {
            setGetterError('No such document!')
            setGetterLoading(false)
         }
      } catch (error) {
         const errorMessage = 'error getting document: ' + error
         setGetterError(errorMessage)
         setGetterLoading(false)
      }
   }

   return { getterLoading, getterError, updaterLoading, updaterError, removerLoading, removerError, loading, error, setItem, updateItem, deleteItem, getItem }
}