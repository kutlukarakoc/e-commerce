import Button from '../../components/ui/button'
import Input from '../../components/ui/input'
import Spinner from '../../components/ui/spinner'
import Radio from '../../components/ui/radio'
import { useEffect, useState, useRef } from 'react'
import { useFirestore } from '../../hooks/useFirestore'
import { useStorage } from '../../hooks/useStorage'
import { useAppSelector } from '../../store/hooks'
import { CameraIcon, TrashIcon } from '@heroicons/react/24/outline'
import userNullImage from '../../assets/user-img.png'
import { genderConstants } from '../../constants/profile/radioConstants'
import LoadingSkeleton from './loading'

const Profile: React.FC = () => {

   // get logged in user information from redux store
   const { user } = useAppSelector(state => state.auth)
   // get states and methods from useFirestore custom hook
   const { getterLoading, getterError, updaterLoading, updaterError, removerLoading, removerError, getItem, updateItem, deleteItem } = useFirestore()
   // get states and methods from useStorage custom hook
   const { fileLoading, fileError, uploadFile } = useStorage()
   // keep track of user information
   const [profile, setProfile] = useState<any>()
   // referance for file type input
   const fileInput = useRef<HTMLInputElement | null>(null)

   // get user from firestore
   const getUser = async (uid: string) => {
      if (user?.uid) {
         const response = await getItem('users', user.uid)
         response && setProfile(response)
      }
   }

   // if there is user, execute getUser function
   useEffect(() => {
      user?.uid && getUser(user.uid)
   }, [user])

   // track of input area changes and set data to profile state
   const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, id, files } = event.target
      if (name === 'photoURL') {
         if (files && files[0]) {
            if (user?.uid) {
               const file = await uploadFile(user.uid + new Date().getTime(), files[0])
               setProfile({ ...profile, [name]: file })
            }
         } else {
            setProfile({ ...profile, [name]: userNullImage })
         }
      } else {
         setProfile({ ...profile, [name]: value })
      }
   }

   // update infos in db when submit
   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event?.preventDefault()
      if (user?.uid) {
         await updateItem('users', user.uid, profile)
         if(!updaterLoading && !updaterError) {
            console.log('changes saved!')
         }
      }
   }

   // display loading skeleton when there is not user yet
   if (getterLoading) {
      return <LoadingSkeleton />
   }

   return (
      <section className='container mx-auto my-24'>
         <div className='flex justify-center items-center flex-col gap-12'>
            <form className='mx-auto w-full max-w-sm sm:max-w-md' onSubmit={handleSubmit}>
               <div className={`w-32 h-32 rounded-full mx-auto relative ${fileError ? 'mb-24' : 'mb-14'}`}>
                  <input type='file' name='photoURL' id='image' accept='image/*' className='sr-only' ref={fileInput} onChange={handleChange} />
                  <img src={profile?.photoURL ? profile.photoURL : userNullImage} alt='' className={`rounded-full w-100 h-100 block mb-2 shadow ${fileLoading ? 'grayscale' : 'grayscale-0'}`} />
                  <div className='flex items-center justify-center gap-4'>
                     <CameraIcon className='w-6 h-6 cursor-pointer' onClick={() => fileInput.current?.click()} />
                     <TrashIcon className='w-6 h-6 cursor-pointer' onClick={() => setProfile({ ...profile, ['photoURL']: userNullImage })} />
                  </div>
                  {fileError && <p className='text-center mt-5 text-sm text-red-500'>{fileError}</p>}
                  {fileLoading && <div className={`w-6 h-6 absolute z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ${fileLoading ? 'block' : 'hidden'}`}><Spinner /></div>}
               </div>

               <h3 className='mb-8 text-base text-center'>Account created at: {profile?.metadata.creationTime ? profile.metadata.creationTime : 'unknown'}</h3>

               <div className='mb-6 grid grid-cols-2 gap-6'>
                  <Input name='name' label='Name' type='text' placeholder='Michael' value={profile?.name ? profile.name : ''} onChange={handleChange} />
                  <Input name='surname' label='Surname' type='text' placeholder='Jackson' value={profile?.surname ? profile.surname : ''} onChange={handleChange} />
               </div>

               <div className='mb-6 grid grid-cols-2 gap-6'>
                  <div className='relative'>
                     <Input name='email' label='Email' type='email' value={profile?.email ? profile.email : ''} readOnly />
                     <div className='text-xs text-indigo-600 hover:text-indigo-500 cursor-pointer absolute top-1 right-1'>Change email</div>
                  </div>
                  <Input name='phoneNumber' label='Phone Number' type='text' placeholder='54645654654' value={profile?.phoneNumber ? profile.phoneNumber : ''} onChange={handleChange} />
               </div>

               <div className='mb-6 grid grid-cols-2 gap-6'>
                  <div className='relative'>
                     <Input name='password' label='Password' type='password' value='******' readOnly />
                     <div className='text-xs text-indigo-600 hover:text-indigo-500 cursor-pointer absolute top-1 right-1'>Change password</div>
                  </div>
                  <Input name='birthday' label='Birthday' type='date' value={profile?.birthday ? profile.birthday : ''} onChange={handleChange} />
               </div>

               <div className='mb-10'>
                  <div className='block text-sm font-medium leading-6 text-gray-700 mb-1.5'>Gender</div>
                  <div className='flex items-center gap-4'>
                     <Radio name='gender' options={genderConstants} selected={profile?.gender ? profile.gender : ''} onChange={handleChange} />
                  </div>
               </div>

               <Button type='submit' variant='filled' size='md' color='indigo' className='w-52 h-11 flex justify-center items-center gap-4 mx-auto disabled:opacity-75 disabled:cursor-not-allowed' disabled={updaterLoading}>
                  Save
                  {updaterLoading && <Spinner />}
               </Button>
               {updaterError && <p className='text-center mt-5 text-sm text-red-500'>{updaterError}</p>}
            </form>
            <div className='w-full flex items-center justify-between max-w-sm sm:max-w-md'>
               <Button type='submit' variant='outline' size='sm' color='red' className='w-36 h-10 flex justify-center items-center gap-4 disabled:opacity-75 disabled:cursor-not-allowed'>
                  Log out
                  {/* {loading && <Spinner />} */}
               </Button>
               <Button type='submit' variant='filled' size='sm' color='red' className='w-36 h-10 flex justify-center items-center gap-4 disabled:opacity-75 disabled:cursor-not-allowed'>
                  Delete Account
                  {/* {loading && <Spinner />} */}
               </Button>
            </div>
         </div>
      </section>
   )
}

export default Profile