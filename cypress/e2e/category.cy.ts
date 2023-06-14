describe('Category tests', () => {

	// log in and navigate to electronics category page
	beforeEach(() => {
		cy.visit('http://localhost:3000/auth')
		cy.get('[data-cy="login-email"]').type('karakockutlu@gmail.com')
		cy.get('[data-cy="login-password"]').type('123456')
		cy.get('[data-cy="login-form"]').submit().then(() => {
			cy.window().its('store').invoke('getState').its('auth').its('user').should('have.property', 'email').then(() => {
				cy.get('[data-cy="header-category"]').eq(0).click()
			})
		})
	})

	it('Does category filter works properly?', () => {
		// check initial filters
		cy.get('[data-cy="selected"]').eq(0).should('include.text', 'Electronics')
		cy.get('[data-cy="selected"]').eq(1).should('include.text', 'Sort')

		cy.window().its('store').invoke('getState').its('filterProducts').as('filterState')
		cy.get('@filterState').its('filteredProducts').should('have.length.above', 1).then((product) => {
			// check mens clothing filter
			cy.get('[data-cy="toggle"]').eq(0).click().then(() => {
				cy.get('[data-cy="content"]').eq(2).click().then(() => {
					cy.url().should('contain', '/products/category/men\'s%20clothing')
					cy.get('[data-cy="product-card-title"]').eq(1).should('include.text', 'Mens')
				})
			})
		})
	})

	it('Does higher to lower price filter works properly?', () => {
		cy.window().its('store').invoke('getState').its('filterProducts').as('filterState')
		cy.get('@filterState').its('filteredProducts').should('have.length.above', 1).then((product) => {
			cy.get('[data-cy="toggle"]').eq(1).click().then(() => {
				cy.get('[data-cy="content"]').eq(4).click().then(() => {
					cy.url().should('contain', '?sort=higher-to-lower-price')
					cy.get('[data-cy="product-card-price"]').eq(0).then((firstProduct) => {
						cy.get('[data-cy="product-card-price"]').eq(1).then((secondProduct) => {
							const firstPrice = firstProduct.text().split('$')[1]
							const secondPrice = secondProduct.text().split('$')[1]
							if (+firstPrice < +secondPrice) {
								throw new Error('Higher to lower price error : first product\'s price lower then second\'s price.')
							}
						})
					})
				})
			})
		})
	})

	it('Does lower to higher price filter works properly?', () => {
		cy.window().its('store').invoke('getState').its('filterProducts').as('filterState')
		cy.get('@filterState').its('filteredProducts').should('have.length.above', 1).then((product) => {
			cy.get('[data-cy="toggle"]').eq(1).click().then(() => {
				cy.get('[data-cy="content"]').eq(5).click().then(() => {
					cy.url().should('contain', '?sort=lower-to-higher-price')
					cy.get('[data-cy="product-card-price"]').eq(0).then((firstProduct) => {
						cy.get('[data-cy="product-card-price"]').eq(1).then((secondProduct) => {
							const firstPrice = firstProduct.text().split('$')[1]
							const secondPrice = secondProduct.text().split('$')[1]
							if (+firstPrice > +secondPrice) {
								throw new Error('Lower to higher price error : first product\'s price bigger then second\'s price.')
							}
						})
					})
				})
			})
		})
	})

	it('Does ascending filter works properly?', () => {
		cy.window().its('store').invoke('getState').its('filterProducts').as('filterState')
		cy.get('@filterState').its('filteredProducts').should('have.length.above', 1).then((product) => {
			cy.get('[data-cy="toggle"]').eq(1).click().then(() => {
				cy.get('[data-cy="content"]').eq(8).click().then(() => {
					cy.url().should('contain', '?sort=asc')
					cy.get('[data-cy="product-card-title"]').eq(0).then((firstProduct) => {
						cy.get('[data-cy="product-card-title"]').eq(1).then((secondProduct) => {
							if (firstProduct < secondProduct) {
								throw new Error('Ascending error')
							}
						})
					})
				})
			})
		})
	})

	it('Does descending filter works properly?', () => {
		cy.window().its('store').invoke('getState').its('filterProducts').as('filterState')
		cy.get('@filterState').its('filteredProducts').should('have.length.above', 1).then((product) => {
			cy.get('[data-cy="toggle"]').eq(1).click().then(() => {
				cy.get('[data-cy="content"]').eq(9).click().then(() => {
					cy.url().should('contain', '?sort=desc')
					cy.get('[data-cy="product-card-title"]').eq(0).then((firstProduct) => {
						cy.get('[data-cy="product-card-title"]').eq(1).then((secondProduct) => {
							if (firstProduct > secondProduct) {
								throw new Error('Descending error')
							}
						})
					})
				})
			})
		})
	})

	it('Does higher to lower rate filter works properly?', () => {
		cy.window().its('store').invoke('getState').its('filterProducts').as('filterState')
		cy.get('@filterState').its('filteredProducts').should('have.length.above', 1).then((product) => {
			cy.get('[data-cy="toggle"]').eq(1).click().then(() => {
				cy.get('[data-cy="content"]').eq(6).click().then(() => {
					cy.url().should('contain', '?sort=higher-to-lower-rate')
					cy.wait(1000)
					cy.get('@filterState').its('filteredProducts').then((products) => {
						const firstProductRating = products[0]['rating']['rate']
						const secondProductRating = products[1]['rating']['rate']
						const thirdProductRating = products[2]['rating']['rate']
						if (firstProductRating === secondProductRating) {
							if (firstProductRating < thirdProductRating) {
								throw new Error('Higher to lower rate error : first product\'s rate lower then second\'s rate.')
							}
						} else {
							if (firstProductRating < thirdProductRating) {
								throw new Error('Higher to lower rate error : first product\'s rate lower then second\'s rate.')
							}
						}
					})
				})
			})
		})
	})

	it('Does lower to higher rate filter works properly?', () => {
		cy.window().its('store').invoke('getState').its('filterProducts').as('filterState')
		cy.get('@filterState').its('filteredProducts').should('have.length.above', 1).then((product) => {
			cy.get('[data-cy="toggle"]').eq(1).click().then(() => {
				cy.get('[data-cy="content"]').eq(7).click().then(() => {
					cy.url().should('contain', '?sort=lower-to-higher-rate')
					cy.wait(1000)
					cy.get('@filterState').its('filteredProducts').then((products) => {
						const firstProductRating = products[0]['rating']['rate']
						const secondProductRating = products[1]['rating']['rate']
						const thirdProductRating = products[2]['rating']['rate']
						if (firstProductRating === secondProductRating) {
							if (firstProductRating > thirdProductRating) {
								throw new Error('Higher to lower rate error : first product\'s rate lower then second\'s rate.')
							}
						} else {
							if (firstProductRating > thirdProductRating) {
								throw new Error('Higher to lower rate error : first product\'s rate lower then second\'s rate.')
							}
						}
					})
				})
			})
		})
	})

})