import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase'
import { useState } from 'react'

interface IStorageResult {
   fileLoading: boolean
   fileError: string | null
   uploadFile: (uid: string, file: any) => Promise<string>
}

export const useStorage = (): IStorageResult => {
   const [fileLoading, setFileLoading] = useState<boolean>(false)
   const [fileError, setFileError] = useState<string | null>(null)

   const uploadFile = (uid: string, file: any): Promise<string> => {
      const storageRef = ref(storage, `images/${uid}.jpg`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      return new Promise<string>((resolve, reject) => {
         uploadTask.on(
            'state_changed',
            (snapshot) => {
               const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
               console.log('Upload is ' + progress + '% done')

               switch (snapshot.state) {
                  case 'paused':
                     console.log('Upload is paused')
                     setFileLoading(false)
                     setFileError('pause')
                     break
                  case 'running':
                     console.log('Upload is running')
                     setFileLoading(true)
                     setFileError(null)
                     break
                  default:
                     break
               }
            },
            (error) => {
               setFileError('Something went wrong. Please try again later.')
               reject(error)
            },
            () => {
               getDownloadURL(uploadTask.snapshot.ref)
                  .then((downloadURL) => {
                     setFileLoading(false)
                     resolve(downloadURL)
                  })
                  .catch((error) => {
                     setFileError('Something went wrong. Please try again later.')
                     reject(error)
                  })
            }
         )
      })
   }

   return { fileLoading, fileError, uploadFile }
}
