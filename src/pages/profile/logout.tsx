import Button from '../../components/ui/button'
import { useAppDispatch } from '../../store/hooks'
import { logout } from '../../store/features/auth'
import { useNavigate } from 'react-router-dom'

const Logout: React.FC = () => {

   const navigate = useNavigate()
   const dispatch = useAppDispatch()

   // logout and navigate to home page
   const handleLogout = () => {
      dispatch(logout())
      navigate('/')
   }

   return (
      <div>
         <Button type='submit' variant='outline' size='sm' color='red' className='w-36 h-10 flex justify-center items-center gap-4 disabled:opacity-75 disabled:cursor-not-allowed' onClick={handleLogout}>
            Log out
         </Button>
      </div>
   )
}

export default Logout