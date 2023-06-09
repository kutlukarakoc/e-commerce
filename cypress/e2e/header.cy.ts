

describe('Header tests', () => {

	beforeEach(() => {
		cy.visit('http://localhost:3000/')
	})

	// right side components when not logged in
	it('Does display right side works properly when not logged and logged in?', () => {
		cy.window().its('store').invoke('getState').its('auth').as('authState')
		
		// right sight item when not logged in
		cy.get('[data-cy="header-right-wrapper"]').as('wrapper')
		cy.get('@authState').its('user').should('be.null')
		cy.get('@wrapper').children().should('have.length', 1)
		cy.get('@wrapper').children().eq(0).should('have.attr', 'href', '/auth')
		cy.get('@wrapper').children().eq(0).click()
		
		// login and redirect tests
		cy.get('[data-cy="login-email"]').type('karakockutlu@gmail.com')
		cy.get('[data-cy="login-password"]').type('123456')
		cy.get('[data-cy="login-form"]').submit().url().should('include', '/profile')
		cy.get('@authState').its('user').should('not.be.null')
		
		// right side items after logged in
		cy.get('@wrapper').children().should('have.length', 3)
		cy.get('@wrapper').children().eq(0).should('have.attr', 'href', '/profile')
		cy.get('@wrapper').children().eq(1).should('have.attr', 'href', '/favorites')
		cy.get('@wrapper').children().eq(2).should('have.attr', 'href', '/cart')
	})

	// desktop search
	it('Does search works properly on desktop?', () => {
		cy.viewport(1280, 800)
		cy.get('[data-cy="header-search-form"]').as('form')
		cy.get('@form').type('men').submit().url().should('include', '/search-results?search=men')
	})

	// mobile search
	it('Does search works properly on mobile?', () => {
		cy.viewport(375, 667)
		cy.get('[data-cy="header-search-form-mb"]').as('mb-form')
		cy.get('@mb-form').type('women').submit().url().should('include', '/search-results?search=women')
	})

	// mobile menu
	it('Does mobile menu works properly?', () => {
		cy.viewport(375, 667)
		
		cy.get('[data-cy="menu-button"]').as('menu-btn')
		
		// menu should not exist on first mount
		cy.get('[data-cy="mobile-menu"]').should('not.exist')
		cy.get('@menu-btn').click()
		
		// menu should exists after click on icon
		cy.get('[data-cy="mobile-menu"]').should('exist')
		
		// get user state and test icon and redirect
		cy.window().its('store').invoke('getState').its('auth').as('authState')
		cy.get('@authState').its('user').should('be.null')
		cy.get('[data-cy="mobile-menu-footer"]').children().eq(0)
		cy.get('[data-cy="mobile-menu-footer"]').children().eq(0).should('have.attr', 'href', '/auth')
		cy.get('[data-cy="mobile-menu-footer"]').children().eq(0).click().url().should('include', '/auth')
		
		// close menu after redirect
		cy.get('[data-cy="mobile-menu"]').should('not.exist')
	})
})