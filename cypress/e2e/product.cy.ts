describe('Product Page tests', () => {

	// log in and navigate to product page
	beforeEach(() => {
		cy.visit('http://localhost:3000/auth')
		cy.get('[data-cy="login-email"]').type('karakockutlu@gmail.com')
		cy.get('[data-cy="login-password"]').type('123456')
		cy.get('[data-cy="login-form"]').submit().then(() => {
			cy.window().its('store').invoke('getState').its('auth').its('user').should('have.property', 'email').then(() => {
				cy.visit('http://localhost:3000/products/5')
			})
		})
	})

	it('Does page render properly?', () => {
		cy.window().its('store').invoke('getState').its('product').its('product').as('productState')
		cy.wait(1000)
		cy.get('@productState').then((product) => {
			cy.get('[data-cy="product-title"]').should('include.text', product['title'])
			cy.get('[data-cy="product-price"]').should('include.text', product['price'])
		})
	})

	it('Does favorite button work properly?', () => {
		cy.window().its('store').invoke('getState').its('product').its('product').as('productState')
		cy.wait(1000)
		cy.get('@productState').then((product) => {
			cy.get('[data-cy="favorite-btn"]').then((button) => {
				if(button.children(":first").hasClass('fill-red-500')) {
					cy.get('[data-cy="favorite-btn"]').click().then(() => {
						cy.get('[data-cy="favorite-btn"]').children().eq(0).should('not.have.class', 'fill-red-500')
					})
				} else {
					cy.get('[data-cy="favorite-btn"]').click().then(() => {
						cy.get('[data-cy="favorite-btn"]').children().eq(0).should('have.class', 'fill-red-500')
					})
				}
			})
		})
	})

	it('Does add to cart button works properly?', () => {
		cy.window().its('store').invoke('getState').its('product').its('product').as('productState')
		cy.wait(1000)
		cy.get('@productState').then((product) => {
			cy.get('[data-cy="addtocart-btn"]').click().then(() => {
				cy.get('[data-cy="product-added"]').should('exist')
				cy.get('[data-cy="product-added-title"]').should('have.text', product['title'])
			})
		})
	})

})