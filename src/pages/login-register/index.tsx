import Login from './login'
import Register from './register'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useWindowWidth } from '../../hooks/useWindowWidth'


const LoginAndRegister: React.FC = () => {

   const [loginTransform, setLoginTransform] = useState<string>('') 

   const displayRegister = () => {
      setLoginTransform('translate-x-full')
   }

   const displayLogin = () => {
      setLoginTransform('')
   }

   const windowWidth = useWindowWidth()

   return (
      <div className='grid grid-cols-1 lg:grid-cols-2 justify-center w-full h-full relative'>
         <div className='absolute z-20 left-2 lg:left-1/2 lg:-translate-x-1/2 top-3 lg:top-1/2 lg:-translate-y-1/2 w-16 lg:w-28 h-14 lg:h-22'>
            <Link to='/'>
               <img src={logo} alt='ecommerce' />
            </Link>
         </div>
         <Login displayRegister={windowWidth < 1025 ? displayRegister : () => undefined} loginTransform={windowWidth < 1025 ? loginTransform : undefined} />
         <Register displayLogin={windowWidth < 1025 ? displayLogin : () => undefined} />
      </div >
   )
}

export default LoginAndRegister