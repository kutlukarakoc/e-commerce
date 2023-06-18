import { informations } from '../../../constants/home/information'

const Information: React.FC = () => {
   return (
      <section className='container mx-auto grid grid-cols-2 md:grid-cols-4 mb-32'>
         {informations.map((item, index) => {
            const IconComponent = item.icon
            return (
               <div key={index} className={`text-center ${index < 2 ? 'mb-6 md:mb-0' : ''}`}>
                  <IconComponent className='h-16 sm:h-20 w-16 sm:w-20 mx-auto text-gray-700' />
                  <h4 className='mt-3 md:mt-4 text-center'>{item.title}</h4>
               </div>
            )
         })}
      </section>
   )
}

export default Information