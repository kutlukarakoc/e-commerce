describe('Register tests', () => {

	beforeEach(() => {
		cy.visit('http://localhost:3000/auth')
		cy.viewport(1280, 800)
	})

	it('Does it register properly?', () => {
		cy.get('[data-cy="register-name"]').type('Michael')
		cy.get('[data-cy="register-surname"]').type('Jackson')
		cy.get('[data-cy="register-email"]').type('cypress_test@gmail.com')
		cy.get('[data-cy="register-password"]').type('123456')
		cy.get('[data-cy="register-form"]').submit().then(() => {
			cy.window().its('store').invoke('getState').its('auth').its('user').should('have.property', 'email')
			cy.url().should('include', '/profile')
		})
	})

	it('Does it throw error when tried to register with registered email?', () => {
		cy.get('[data-cy="register-name"]').type('Michael')
		cy.get('[data-cy="register-surname"]').type('Jackson')
		cy.get('[data-cy="register-email"]').type('cypress_test@gmail.com')
		cy.get('[data-cy="register-password"]').type('123456')
		cy.get('[data-cy="register-form"]').submit().then(() => {
			cy.get('[data-cy="register-error"]').then(error => {
				if (error.text() !== 'This email is already registered.') {
					throw new Error('firestore error: registered user can register again')
				}
			})
		})
	})

	it('Does name validation work properly?', () => {
		cy.get('[data-cy="register-error"]').should('not.exist')
		cy.get('[data-cy="register-name"]').focus().then(() => {
			cy.get('[data-cy="register-surname"]').focus().then(() => {
				cy.get('[data-cy="input-error"]').then(error => {
					if (error.text() !== 'Name is required') {
						throw new Error('Name validation is not working correctly: required')
					}
				})
			})
		})
	})

	it('Does surname validation work properly?', () => {
		cy.get('[data-cy="register-error"]').should('not.exist')
		cy.get('[data-cy="register-surname"]').focus().then(() => {
			cy.get('[data-cy="register-name"]').focus().then(() => {
				cy.get('[data-cy="input-error"]').then(error => {
					if (error.text() !== 'Surname is required') {
						throw new Error('Surname validation is not working correctly: required')
					}
				})
			})
		})
	})

	it('Does email validation works properly?', () => {
		cy.get('[data-cy="register-error"]').should('not.exist')
		cy.get('[data-cy="register-email"]').type('cypress_test@gmail').then(() => {
			cy.get('[data-cy="register-password"]').focus().then(() => {
				cy.get('[data-cy="input-error"]').then(error => {
					if (error.text() !== 'Email must be valid') {
						throw new Error('Email validation is not working correctly: invalid')
					}
				})
			})
		})
	})

	it('Does email required works properly?', () => {
		cy.get('[data-cy="register-error"]').should('not.exist')
		cy.get('[data-cy="register-email"]').focus().then(() => {
			cy.get('[data-cy="register-password"]').focus().then(() => {
				cy.get('[data-cy="input-error"]').then(error => {
					if (error.text() !== 'Email is required') {
						throw new Error('Email validation is not working correctly: required')
					}
				})
			})
		})
	})

	it('Does password validation works properly?', () => {
		cy.get('[data-cy="register-error"]').should('not.exist')
		cy.get('[data-cy="register-password"]').type('123').then(() => {
			cy.get('[data-cy="register-email"]').focus().then(() => {
				cy.get('[data-cy="input-error"]').then(error => {
					if (error.text() !== 'Password must be at least 6 characters') {
						throw new Error('Email validation is not working correctly: invalid')
					}
				})
			})
		})
	})

	it('Does password required works properly?', () => {
		cy.get('[data-cy="register-error"]').should('not.exist')
		cy.get('[data-cy="register-password"]').focus().then(() => {
			cy.get('[data-cy="register-email"]').type('cypress_test@gmail.com').then(() => {
				cy.get('[data-cy="input-error"]').then(error => {
					if (error.text() !== 'Password is required') {
						throw new Error('Password validation is not working correctly: required')
					}
				})
			})
		})
	})
})