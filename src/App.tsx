import Header from './components/header'
import Footer from './components/footer'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Product from './pages/product'
import ProductListing from './pages/category'
import SearchResults from './pages/search-results'
import NotFound from './components/not-found'
import LoginAndRegister from './pages/login-register'
import { useLocation, Navigate } from 'react-router-dom'
import React from 'react'

const App: React.FC = () => {

	/* defining routes to not display header and footer components */
	const { pathname } = useLocation()
	const notAllowedPaths: string[] = ['/auth']
	const isAllowed: boolean = !notAllowedPaths.includes(pathname)

/*	const currentUser = true
	const RequireAuth = ({children}: any) => {
		return currentUser ? children : <Navigate to='/' />
	}
*/
	return (
		<main className='font-sans h-full flex flex-col text-gray-700'>
			{isAllowed && <Header />}
			<div className='flex-1'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/products/*' element={<ProductListing />} />
					<Route path='/products/:productId' element={<Product />} />
					<Route path='/search-results/*' element={<SearchResults />} />
					<Route path='/auth' element={<LoginAndRegister />} />
					<Route path='*' element={<NotFound title='Page not found' text='Sorry, we couldn’t find the page you’re looking for.' link='/' />} />
				</Routes>
			</div>
			{isAllowed && <Footer />}
		</main>
	)
}

export default App