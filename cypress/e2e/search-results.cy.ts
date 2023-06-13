
describe('Search result tests', () => {

	it('Does it search properly', () => {
		cy.visit('http://localhost:3000/')
		
		// select searchProducts state
		cy.window().its('store').invoke('getState').its('searchProducts').as('searchState')

		// initial state
		cy.get('@searchState').its('searchedProducts').should('have.length', 0)
		cy.get('@searchState').its('loading').should('equal', false)
		cy.get('@searchState').its('error').should('be.null')

		// search for product and redirect
		cy.get('[data-cy="head-search"]').type('cotton').type('{enter}')
		cy.url().should('include', '/search-results?search=cotton')

		// loading state
		cy.get('@searchState').its('loading').should('equal', true)
		cy.get('[data-cy="loading-skeleton"]').should('exist')
		cy.get('@searchState').its('loading').should('equal', false)
		cy.get('[data-cy="loading-skeleton"]').should('not.exist')

		// success
		cy.get('@searchState').its('searchedProducts').should('have.length.above', 0)
		cy.get('[data-cy="product-card-title"]').contains('cotton', { matchCase: false })
		cy.get('@searchState').its('error').should('be.null')
	})
})