import UploadImage from './uploadImage'
import DeleteAccount from './deleteAccount'
import Logout from './logout'
import VerifyEmail from './verifyEmail'
import Password from './password'
import Button from '../../components/ui/button'
import Input from '../../components/ui/input'
import Spinner from '../../components/ui/spinner'
import Radio from '../../components/ui/radio'
import LoadingSkeleton from './loading'
import ProfileSaved from '../../components/popup/profileSaved'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import { useFirestore } from '../../hooks/useFirestore'
import { useNavigate } from 'react-router-dom'
import { useSwal } from '../../hooks/useSwal'
import { genderConstants } from '../../constants/profile/radioConstants'

const Profile: React.FC = () => {

   const navigate = useNavigate()

   // get logged in user information from redux store
   const { user } = useAppSelector(state => state.auth)
   // get states and methods from useFirestore custom hook
   const { getterLoading, updaterLoading, updaterError, getItem, updateItem } = useFirestore()
   // keep track of user information
   const [profile, setProfile] = useState<any>()
   // getting swal from custom hook
   const { showSwal } = useSwal()

   // get user from firestore
   const getUser = async () => {
      if (user?.uid) {
         const response = await getItem('users', user.uid)
         response && setProfile(response)
      }
   }

   // if there is user, execute getUser function
   useEffect(() => {
      user?.uid ? getUser() : navigate('/auth')
   }, [user])

   // track of input area changes and set data to profile state
   const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
      if (name !== 'photoURL') {
         setProfile({ ...profile, [name]: value })
      }
   }

   // update infos in db when submit
   const handleSaveForm = async (event: React.FormEvent<HTMLFormElement>) => {
      event?.preventDefault()
      if (user?.uid) {
         await updateItem('users', user.uid, profile)
         if (!updaterLoading && !updaterError) {
            showSwal(<ProfileSaved />, 'success', 2000)
         }
      }
   }

   // display loading skeleton when there is not user yet
   if (getterLoading) {
      return <LoadingSkeleton />
   }

   return (
      <section className='container mx-auto my-20 px-4 sm:px-0'>
         {!user?.emailVerified && <VerifyEmail />}
         <div className='flex justify-center items-center flex-col gap-12'>
            <form className='mx-auto w-full max-w-sm sm:max-w-md' onSubmit={handleSaveForm}>
               <UploadImage profile={profile} setProfile={setProfile} uid={user?.uid} />

               <h3 className='mb-4 text-center'>Account created at: {profile?.metadata.creationTime ? profile.metadata.creationTime : 'unknown'}</h3>

               {user?.emailVerified && <h3 className='mb-8 text-center flex justify-center items-center gap-2 text-green-500'>
                  <CheckCircleIcon className='w-5 h-5' />
                  <p className='pb-0.5'>Account verified!</p>
               </h3>}

               <div className='mb-6 grid grid-cols-2 gap-6'>
                  <Input name='name' label='Name' type='text' placeholder='Michael' value={profile?.name ? profile.name : ''} onChange={handleChange} />
                  <Input name='surname' label='Surname' type='text' placeholder='Jackson' value={profile?.surname ? profile.surname : ''} onChange={handleChange} />
               </div>

               <div className='mb-6 grid grid-cols-2 gap-6'>
                  <Input name='email' label='Email' type='email' value={profile?.email ? profile.email : ''} readOnly />
                  <Input name='phoneNumber' label='Phone Number' type='text' placeholder='54645654654' value={profile?.phoneNumber ? profile.phoneNumber : ''} onChange={handleChange} />
               </div>

               <div className='mb-6 grid grid-cols-2 gap-6'>
                  <Password email={user?.email} />
                  <Input name='birthday' label='Birthday' type='date' value={profile?.birthday ? profile.birthday : ''} onChange={handleChange} />
               </div>

               <div className='mb-10'>
                  <div className='block text-sm font-medium leading-6 text-gray-700 mb-1.5'>Gender</div>
                  <div className='flex items-center gap-4'>
                     <Radio name='gender' options={genderConstants} selected={profile?.gender ? profile.gender : ''} onChange={handleChange} />
                  </div>
               </div>

               <Button type='submit' variant='filled' size='md' color='indigo' className='w-52 h-11 flex justify-center items-center gap-4 mx-auto' disabled={updaterLoading}>
                  Save
                  {updaterLoading && <Spinner />}
               </Button>
               {updaterError && <p className='text-center mt-5 text-sm text-red-500'>{updaterError}</p>}
            </form>
            <div className='w-full flex justify-between max-w-sm sm:max-w-md'>
               <Logout />
               <DeleteAccount uid={user?.uid} />
            </div>
         </div>
      </section>
   )
}

export default Profile