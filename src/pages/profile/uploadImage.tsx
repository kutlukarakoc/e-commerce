import { CameraIcon, TrashIcon } from '@heroicons/react/24/outline'
import Spinner from '../../components/ui/spinner'
import { useRef } from 'react'
import userNullImage from '../../assets/user-img.png'
import { useStorage } from '../../hooks/useStorage'

interface IUploadImage {
   profile: any
   setProfile: React.Dispatch<any>
   uid: string | undefined
}

const UploadImage: React.FC<IUploadImage> = ({ uid, profile, setProfile }) => {

   // get states and methods from useStorage custom hook
   const { fileLoading, fileError, uploadFile } = useStorage()

   // referance for file type input
   const fileInput = useRef<HTMLInputElement | null>(null)

   const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, files } = event.target
      if (uid && files && files[0]) {
         const file = await uploadFile(uid + new Date().getTime(), files[0])
         setProfile({ ...profile, [name]: file })
      } else {
         setProfile({ ...profile, [name]: userNullImage })
      }
   }

   return (
      <div className={`w-32 h-32 rounded-full mx-auto relative ${fileError ? 'mb-24' : 'mb-14'}`}>
         <input type='file' name='photoURL' id='image' accept='image/*' className='sr-only' ref={fileInput} onChange={handleImageChange} />
         <img src={profile?.photoURL ? profile.photoURL : userNullImage} alt='' className={`rounded-full w-100 h-100 block mb-2 shadow ${fileLoading ? 'grayscale' : 'grayscale-0'}`} />
         <div className='flex items-center justify-center gap-4'>
            <CameraIcon className='w-6 h-6 cursor-pointer' onClick={() => fileInput.current?.click()} />
            <TrashIcon className='w-6 h-6 cursor-pointer' onClick={() => setProfile({ ...profile, ['photoURL']: userNullImage })} />
         </div>
         {fileError && <p className='text-center mt-5 text-sm text-red-500'>{fileError}</p>}
         {fileLoading && <div className={`w-6 h-6 absolute z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ${fileLoading ? 'block' : 'hidden'}`}><Spinner /></div>}
      </div>
   )
}

export default UploadImage