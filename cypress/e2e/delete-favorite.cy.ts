import { IProduct } from '../../src/types/productsTypes'

describe('Delete favorite tests', () => {

	// log in and navigate to wishlist page
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

	it('Does it delete product from wishlist?', () => {
		cy.window().its('store').invoke('getState').its('wishlist').its('wishlist').as('wishlistState')
		cy.get('[data-cy="product-card-title"]').eq(0).then(title => {
			const firstProductTitle = title.text()
			cy.get<IProduct[]>('@wishlistState').then((wishlist) => {
				cy.wait(2000)
				const productBeforeClick = wishlist.find((product: IProduct) => product.title === firstProductTitle)
				if (!productBeforeClick) {
					throw new Error('Product can\'t find in wishlist.')
				}
				cy.get('[data-cy="trash-icon"]').eq(0).click().then(() => {
					cy.wait(2000)
					cy.get<IProduct[]>('@wishlistState').then((wishlistAfterClick) => {
						cy.wait(2000)
						const productAfterClick = wishlistAfterClick.find((product: IProduct) => product.title === firstProductTitle)
						if (productAfterClick) {
							throw new Error('Product not removed from wishlist.')
						}
					})
				})
			})
		})
	})
})