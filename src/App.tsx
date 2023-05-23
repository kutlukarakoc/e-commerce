import Header from './components/header'
import Footer from './components/footer'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Product from './pages/product'
import ProductListing from './pages/category'
import SearchResults from './pages/search-results'

const App: React.FC = () => {
	return (
		<main className='font-sans h-full flex flex-col text-gray-700'>
			<Header />
			<div className='flex-1'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/products/*' element={<ProductListing />} />
					<Route path='/products/:productId' element={<Product />} />
					<Route path='/search-results/*' element={<SearchResults />} />
				</Routes>
			</div>
			<Footer />
		</main>
	)
}

export default App