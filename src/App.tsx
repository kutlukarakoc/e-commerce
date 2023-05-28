import Header from './components/header'
import Footer from './components/footer'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Product from './pages/product'
import ProductListing from './pages/category'
import SearchResults from './pages/search-results'
import Profile from './pages/profile'
import Favorites from './pages/favorites'
import Cart from './pages/cart'
import NotFound from './components/not-found'
import LoginAndRegister from './pages/login-register'
import { useLocation, Navigate } from 'react-router-dom'
import { useAppSelector } from './store/hooks'
import { useState, useEffect } from 'react'

const App: React.FC = () => {

	// defining routes to not display header and footer components
	const { pathname } = useLocation()
	const notAllowedPaths: string[] = ['/auth']
	const isAllowed: boolean = !notAllowedPaths.includes(pathname)

	// state to keep track of whether current user or not
	const [currentUser, setCurrentUser] = useState<boolean>(false)

	// getting user from store
	const user = useAppSelector(state => state.auth.user)

	// if there is user set current state to true, else false
	useEffect(() => {
		user ? setCurrentUser(true) : setCurrentUser(false)
	}, [user])

	// if there is current user display component, else navigate to auth page
	const RequireAuth = ({ children }: any) => {
		return currentUser ? children : <Navigate to='/auth' />
	}

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
					<Route path='/profile' element={<RequireAuth><Profile /></RequireAuth>} />
					<Route path='/favorites' element={<RequireAuth><Favorites /></RequireAuth>} />
					<Route path='/cart' element={<RequireAuth><Cart /></RequireAuth>} />
					<Route path='*' element={<NotFound title='Page not found' text='Sorry, we couldn’t find the page you’re looking for.' link='/' />} />
				</Routes>
			</div>
			{isAllowed && <Footer />}
		</main>
	)
}

export default App