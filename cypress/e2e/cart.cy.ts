describe('Cart tests', () => {
	// log in and navigate to cart
	beforeEach(() => {
		cy.visit('http://localhost:3000/auth')
		cy.get('[data-cy="login-email"]').type('karakockutlu@gmail.com')
		cy.get('[data-cy="login-password"]').type('123456')
		cy.get('[data-cy="login-form"]').submit().then(() => {
			cy.window().its('store').invoke('getState').its('auth').its('user').should('have.property', 'email').then(() => {
				cy.get('[data-cy="header-right-wrapper"]').children().eq(2).click()
			})
		})
	})

	it('Does cart display properly?', () => {
		cy.url().should('include', 'cart').then(() => {
			cy.window().its('store').invoke('getState').its('cart').its('cart').should('have.length.above', 0).then((cart) => {
				cy.get('[data-cy="cart-title"]').should('include.text', `Shopping Cart (${cart.length} products)`)
				cy.get('[data-cy="cart-product-container"]').should('have.length', cart.length)
				cy.get('[data-cy="cart-summary-container"]').should('exist')
				cy.get('[data-cy="not-found"]').should('not.exist')
			})
		})
	})


	it('Does it remove item from cart properly?', () => {
		cy.url().should('include', 'cart').then(() => {
			cy.window().its('store').invoke('getState').its('cart').its('cart').as('cartState')
			cy.get('@cartState').should('have.length', 2).then(() => {
				cy.get('[data-cy="remove-product"]').eq(0).click().then(() => {
					cy.get('@cartState').should('have.length', 1)
				})
			})
		})
	})

	it('Does quantity for product works properly?', () => {
		cy.url().should('include', 'cart').then(() => {
			cy.window().its('store').invoke('getState').its('cart').its('cart').as('cartState')
			cy.get('@cartState').should('have.length', 2).then((cart) => {
				const productPrice = cart[0]['price']
				cy.get('[data-cy="quantity"]').eq(0).select('2').should('have.value', '2').then(() => {
					cy.get('[data-cy="product-price"]').eq(0).should('have.text', `$${(productPrice * 2).toFixed(2)}`)
					cy.get('[data-cy="quantity"]').eq(0).select('1').should('have.value', '1').then(() => {
						cy.get('[data-cy="product-price"]').eq(0).should('have.text', `$${(productPrice).toFixed(2)}`)
					})
				})
			})
		})
	})

	it('Does summary works properly?', () => {
		cy.url().should('include', 'cart').then(() => {
			cy.window().its('store').invoke('getState').its('cart').its('cart').as('cartState')
			cy.get('@cartState').should('have.length', 2).then((cart) => {
				const firstProductPrice = cart[0]['price']
				const SecondProductPrice = cart[1]['price']
				cy.get('[data-cy="quantity"]').eq(0).select('1').should('have.value', '1').then(() => {
					cy.get('[data-cy="subtotal"]').should('have.text', `$${(firstProductPrice + SecondProductPrice).toFixed(2)}`)
					if(firstProductPrice + SecondProductPrice > 100) {
						cy.get('[data-cy="shipping-estimate"]').should('have.text', '$0.00')
						cy.get('[data-cy="order-total"]').should('have.text', `$${(firstProductPrice + SecondProductPrice).toFixed(2)}`)
					} else {
						cy.get('[data-cy="shipping-estimate"]').should('have.text', '$5.00')
						cy.get('[data-cy="order-total"]').should('have.text', `$${(firstProductPrice + SecondProductPrice + 5).toFixed(2)}`)
					}
				})
			})
		})
	})
})
