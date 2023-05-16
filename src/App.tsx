import Header from './components/header'
import Footer from './components/footer'

const App = () => {
  return (
    <main className='font-sans h-full flex flex-col text-gray-700'>
      <Header />
      <div className='flex-1'>
        body
      </div>
      <Footer />
    </main>
  )
}

export default App