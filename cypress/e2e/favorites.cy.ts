describe('Favorites page tests', () => {

	// log in and navigate to favorites page
	beforeEach(() => {
		cy.visit('http://localhost:3000/auth')
		cy.get('[data-cy="login-email"]').type('karakockutlu@gmail.com')
		cy.get('[data-cy="login-password"]').type('123456')
		cy.get('[data-cy="login-form"]').submit().then(() => {
			cy.window().its('store').invoke('getState').its('auth').its('user').should('have.property', 'email').then(() => {
				cy.get('[data-cy="header-right-wrapper"]').children().eq(1).click()
			})
		})
	})

	it('Does it render elements properly?', () => {
		cy.window().its('store').invoke('getState').its('wishlist').its('wishlist').as('wishlist')
		cy.wait(1000)
		cy.get('@wishlist').then((wishlist) => {
			cy.get('[data-cy="wishlist-title"]').should('include.text', `My Wishlist (${wishlist.length} products)`)
			cy.get('[data-cy="product-card"]').should('have.length', wishlist.length)
		})
	})

	it('Does remove item from wishlist works properly?', () => {
		cy.window().its('store').invoke('getState').its('wishlist').its('wishlist').as('wishlist')
		cy.wait(1000)
		cy.get('@wishlist').then((wishlist) => {
			const currentWishlistLength = wishlist.length
			cy.get('[data-cy="product-card"]').children().eq(0).should('have.class', 'top-2')
			cy.get('[data-cy="product-card"]').children().eq(0).click().then(() => {
				cy.get('[data-cy="product-card"]').should('have.length', currentWishlistLength - 1)
			})
		})
	})

	it('Does add to cart button works properly?', () => {
		cy.get('[data-cy="btn-component"]').eq(0).click().then(() => {
			cy.get('[data-cy="product-added"]').should('exist')
		})
	})
})