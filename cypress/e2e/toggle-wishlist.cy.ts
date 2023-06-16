import { IProduct } from '../../src/types/productsTypes'

describe('Toggle Wishlist tests', () => {

	it('Does it work properly when user not logged in?', () => {
		cy.visit('http://localhost:3000/products/category/jewelery')
		cy.window().its('store').invoke('getState').its('auth').its('user').should('be.null')
		cy.get('[data-cy="login-popup"]').should('not.exist')
		cy.get('[data-cy="favorite-btn"]').eq(0).click().then(() => {
			cy.get('[data-cy="login-popup"]').should('exist')
		})
	})

	it('Does it work properly when user logged in?', () => {
		cy.visit('http://localhost:3000/auth')
		cy.get('[data-cy="login-email"]').type('karakockutlu@gmail.com')
		cy.get('[data-cy="login-password"]').type('123456')
		cy.get('[data-cy="login-form"]').submit().then(() => {
			cy.window().its('store').invoke('getState').its('auth').its('user').should('have.property', 'email').then(() => {
				cy.visit('http://localhost:3000/products/category/jewelery').then(() => {
					cy.get('[data-cy="product-added"]').should('not.exist')
					cy.window().its('store').invoke('getState').its('wishlist').its('wishlist').as('wishlistState').then(() => {
						cy.wait(2000)
						cy.get('[data-cy="favorite-btn"]').eq(0).children(':first').as('firstFavoriteButton')
						cy.get<IProduct[]>('@wishlistState').then((wishlist) => {
							const firstProductIdInPage = 5
							const addedProduct = wishlist.find((product) => product.id === firstProductIdInPage)
							if (addedProduct) {
								cy.get('@firstFavoriteButton').should('have.class', 'fill-red-500').then(() => {
									cy.get('@firstFavoriteButton').click().then(() => {
										cy.wait(2000)
										cy.get('@firstFavoriteButton').should('not.have.class', 'fill-red-500').then(() => {
											cy.get<IProduct[]>('@wishlistState').then((wishlist) => {
												const wishlistAfterClick = wishlist.find((product) => product.id === firstProductIdInPage)
												if (wishlistAfterClick) {
													throw new Error('Product not removed from wishlist')
												}
											})
										})
									})
								})
							} else {
								cy.get('@firstFavoriteButton').should('not.have.class', 'fill-red-500').then(() => {
									cy.get('@firstFavoriteButton').click().then(() => {
										cy.wait(2000)
										cy.get('@firstFavoriteButton').should('have.class', 'fill-red-500').then(() => {
											cy.get<IProduct[]>('@wishlistState').then((wishlist) => {
												const wishlistAfterClick = wishlist.find((product) => product.id === firstProductIdInPage)
												if (!wishlistAfterClick) {
													throw new Error('Product not added to wishlist')
												}
											})
										})
									})
								})
							}
						})
					})
				})
			})
		})
	})

})