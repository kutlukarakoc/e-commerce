import Spinner from '../../components/ui/spinner'
import Button from '../../components/ui/button'
import { useAuth } from '../../hooks/useAuth'
import { useFirestore } from '../../hooks/useFirestore'
import { useAppDispatch } from '../../store/hooks'
import { logout } from '../../store/features/auth'
import { useNavigate } from 'react-router-dom'

interface IDeleteAccount {
   uid: string | undefined
}

const DeleteAccount: React.FC<IDeleteAccount> = ({ uid }) => {

   const dispatch = useAppDispatch()
   const navigate = useNavigate()

   // get states and methods from useAuth custom hook
   const { deleteUserAcc } = useAuth()
   // get states and methods from useFirestore custom hook
   const { removerLoading, removerError, deleteItem } = useFirestore()

   // delete user from firestore, local storage, auth and navigate to home page
   const deleteUserAccount = async () => {
      if (uid) {
         await deleteUserAcc()
         await deleteItem('users', uid)
         await deleteItem('wishlist', uid)
         await deleteItem('cart', uid)
         dispatch(logout())
         navigate('/')
      }
   }

   return (
      <div>
         <Button type='submit' variant='filled' size='sm' color='red' className='w-36 h-10 flex justify-center items-center gap-4 disabled:opacity-75 disabled:cursor-not-allowed' onClick={deleteUserAccount}>
            Delete Account
            {removerLoading && <Spinner />}
         </Button>
         {removerError && <p className='text-center mt-5 text-sm text-red-500'>{removerError}</p>}
      </div>
   )
}

export default DeleteAccount