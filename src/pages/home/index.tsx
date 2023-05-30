import HeroSection from './hero'
import CategoriesSection from './categories'
import OurPicks from './our-picks'
import Information from './information'

const Home: React.FC = () => {
   return (
      <>
         <HeroSection />
         <CategoriesSection />
         <OurPicks />
         <Information />
      </>
   )
}

export default Home