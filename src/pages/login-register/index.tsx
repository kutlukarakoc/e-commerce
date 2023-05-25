import Login from './login'
import Register from './register'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

const LoginAndRegister = () => {
   return (
      <div className='grid grid-cols-2 justify-center w-full h-full relative'>
         <div className='absolute z-10 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-28 h-22'>
            <Link to='/'>
               <img src={logo} alt='ecommerce' />
            </Link>
         </div>
         <Login />
         <Register />
      </div >
   )
}

export default LoginAndRegister