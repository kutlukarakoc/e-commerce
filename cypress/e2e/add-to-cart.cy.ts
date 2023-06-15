import { ICart } from '../../src/types/cartTypes'

describe('Add to cart button tests', () => {

	it('Does it work properly when user not logged in?', () => {
		cy.visit('http://localhost:3000/products/6')
		cy.window().its('store').invoke('getState').its('auth').its('user').should('be.null')
		cy.get('[data-cy="login-popup"]').should('not.exist')
		cy.get('[data-cy="btn-component"]').click().then(() => {
			cy.get('[data-cy="login-popup"]').should('exist')
			cy.get('[data-cy="btn-component"]').eq(1).click().then(() => {
				cy.url().should('include', 'auth')
			})
		})
	})

	it('Does it work properly when user logged in?', () => {
		cy.visit('http://localhost:3000/auth')
		cy.get('[data-cy="login-email"]').type('karakockutlu@gmail.com')
		cy.get('[data-cy="login-password"]').type('123456')
		cy.get('[data-cy="login-form"]').submit().then(() => {
			cy.window().its('store').invoke('getState').its('auth').its('user').should('have.property', 'email').then(() => {
				cy.visit('http://localhost:3000/products/9').then(() => {
					cy.get('[data-cy="product-added"]').should('not.exist')
					cy.window().its('store').invoke('getState').its('cart').its('cart').as('cartState')
					cy.wait(2000)
					cy.get<ICart[]>('@cartState').then((cart: ICart[]) => {
						const cartLength = cart.length
						const addedProduct = cart.find((product: ICart) => product.id === 9)
						if (addedProduct) {
							const quantityBeforeClick = addedProduct.quantity
							cy.get('[data-cy="btn-component"]').click().then(() => {
								cy.wait(1000)
								cy.get('[data-cy="product-added"]').should('exist').then(() => {
									cy.get<ICart[]>('@cartState').then((updatedCart: ICart[]) => {
										const updatedProduct = updatedCart.find((product: ICart) => product.id === 9)
										const quantityAfterClick = updatedProduct ? updatedProduct.quantity : 0
										if (quantityBeforeClick !== quantityAfterClick - 1) {
											throw new Error('Product not added to cart')
										}
									})
								})
							})
						} else {
							cy.get('[data-cy="btn-component"]').click().then(() => {
								cy.get('[data-cy="product-added"]').should('exist')
								cy.get('@cartState').should('have.length', cartLength + 1)
							})
						}
						cy.get('[data-cy="btn-component"]').eq(1).click().then(() => {
							cy.url().should('include', 'cart')
						})
					})
				})
			})
		})
	})
})