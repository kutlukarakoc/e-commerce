import Divider from '../../../components/ui/divider'

const Shipping: React.FC = () => {
   return (
      <>
         <div className='flex justify-between items-center'>
            <div className='text-gray-500 text-sm'>Shipping estimate</div>
            <div className='text-sm'>$5.00</div>
         </div>
         <Divider variant='soft' />
      </>
   )
}

export default Shipping