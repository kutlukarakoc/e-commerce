import Products from './products'
import Summary from './summary'

const Cart: React.FC = () => {
   return (
      <section className='container mx-auto my-20 flex-1'>
         <h1 className='text-3xl font-semibold mb-16'>Shopping Cart (5 products)</h1>
         <div className='grid grid-cols-8'>
            <div className='col-span-5'>
               <Products />
            </div>
            <div className='col-span-3'>
               <Summary />
            </div>
         </div>
      </section>
   )
}

export default Cart