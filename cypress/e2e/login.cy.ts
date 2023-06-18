describe('Login tests', () => {

	it('Does it login properly when email and password is correct?', () => {
		cy.visit('http://localhost:3000/auth')
		cy.get('[data-cy="login-email"]').type('karakockutlu@gmail.com')
		cy.get('[data-cy="login-password"]').type('123456')
		cy.get('[data-cy="login-form"]').submit().then(() => {
			cy.window().its('store').invoke('getState').its('auth').its('user').should('have.property', 'email')
		})
	})

	it('Does it throw error when password is not correct?', () => {
		cy.visit('http://localhost:3000/auth')
		cy.get('[data-cy="login-error"]').should('not.exist')
		cy.get('[data-cy="login-email"]').type('cypress_test@gmail.com')
		cy.get('[data-cy="login-password"]').type('123456')
		cy.get('[data-cy="login-form"]').submit().then(() => {
			cy.get('[data-cy="login-error"]').should('exist')
		})
	})

	it('Does email validation works properly?', () => {
		cy.visit('http://localhost:3000/auth')
		cy.get('[data-cy="login-error"]').should('not.exist')
		cy.get('[data-cy="login-email"]').type('cypress_test@gmail').then(() => {
			cy.get('[data-cy="login-password"]').focus().then(() => {
				cy.get('[data-cy="input-error"]').then(error => {
					if (error.text() !== 'Email must be valid') {
						throw new Error('Email validation is not working correctly: invalid')
					}
				})
			})
		})
	})

	it('Does email required works properly?', () => {
		cy.visit('http://localhost:3000/auth')
		cy.get('[data-cy="login-error"]').should('not.exist')
		cy.get('[data-cy="login-email"]').focus().then(() => {
			cy.get('[data-cy="login-password"]').focus().then(() => {
				cy.get('[data-cy="input-error"]').then(error => {
					if (error.text() !== 'Email is required') {
						throw new Error('Email validation is not working correctly: required')
					}
				})
			})
		})
	})

	it('Does password validation works properly?', () => {
		cy.visit('http://localhost:3000/auth')
		cy.get('[data-cy="login-error"]').should('not.exist')
		cy.get('[data-cy="login-password"]').type('123').then(() => {
			cy.get('[data-cy="login-email"]').focus().then(() => {
				cy.get('[data-cy="input-error"]').then(error => {
					if (error.text() !== 'Password must be at least 6 characters') {
						throw new Error('Email validation is not working correctly: invalid')
					}
				})
			})
		})
	})

	it('Does password required works properly?', () => {
		cy.visit('http://localhost:3000/auth')
		cy.get('[data-cy="login-error"]').should('not.exist')
		cy.get('[data-cy="login-password"]').focus().then(() => {
			cy.get('[data-cy="login-email"]').type('cypress_test@gmail.com').then(() => {
				cy.get('[data-cy="input-error"]').then(error => {
					if (error.text() !== 'Password is required') {
						throw new Error('Password validation is not working correctly: required')
					}
				})
			})
		})
	})
})