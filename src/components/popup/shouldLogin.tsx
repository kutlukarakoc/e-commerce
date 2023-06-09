import Button from '../ui/button'


interface IShouldLogin {
   setRedirect: React.Dispatch<React.SetStateAction<boolean>>
}

const ShouldLogin: React.FC<IShouldLogin> = ({ setRedirect }) => {

   const handleClick = () => {
      setRedirect(true)
   }

   return (
      <div className='p-4'>
         <h2 className='text-2xl font-medium mb-6'>You're not logged in.</h2>
         <h4 className='text-base font-medium mb-6'>You need to login to do this action.</h4>
         <Button variant='filled' size='sm' color='indigo' className='py-2 px-8 mx-auto' onClick={handleClick}>Login</Button>
      </div>
   )
}

export default ShouldLogin