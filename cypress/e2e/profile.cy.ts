describe('Profile tests', () => {

	// log in and navigate to profile
	beforeEach(() => {
		cy.visit('http://localhost:3000/auth')
		cy.get('[data-cy="login-email"]').type('karakockutlu@gmail.com')
		cy.get('[data-cy="login-password"]').type('123456')
		cy.get('[data-cy="login-form"]').submit().then(() => {
			cy.window().its('store').invoke('getState').its('auth').its('user').should('have.property', 'email').then(() => {
				cy.get('[data-cy="header-right-wrapper"]').children().eq(0).click()
			})
		})
	})

	it('Does verify email button works properly?', () => {
		cy.get('[data-cy="verify-text"]').should('include.text', 'Please verify your email')
		cy.get('[data-cy="verify-email"]').click().then(() => {
			cy.wait(1000)
			cy.get('[data-cy="verify-text"]').then((verifyEmail) => {
				const verifyText = verifyEmail.text()
				if (verifyText.indexOf('verification has been sent') < 0 && verifyText.indexOf('went wrong') < 0) {
					throw new Error('verification error')
				}
			})
		})
	})

	it('Does account creation time displays properly?', () => {
		cy.window().its('store').invoke('getState').its('auth').its('user').should('have.property', 'metadata').then((metadata => {
			cy.get('[data-cy="creation-time"]').should('include.text', metadata.creationTime)
		}))
	})

	it('Does inputs work properly?', () => {
		cy.window().its('store').invoke('getState').its('auth').its('user').should('have.property', 'uid').then((uid => {
			if (uid === 'J84hsF1xAhNrC1Y6i3ofUuzqN2z1') {
				cy.get('[data-cy="profile-name"]').should('have.value', 'Kutlu')
				cy.get('[data-cy="profile-surname"]').should('have.value', 'Karakoc')
				cy.get('[data-cy="profile-email"]').should('have.value', 'karakockutlu@gmail.com')
				cy.get('[data-cy="profile-phone"]').should('have.value', '5356782650')
				cy.get('[data-cy="profile-birthday"]').should('have.value', '1997-02-15')
				cy.get('[data-cy="profile-gender"]').eq(0).should('have.attr', 'checked')
				cy.get('[data-cy="profile-picture"]').should('have.attr', 'src', 'https://firebasestorage.googleapis.com/v0/b/ecommerce-43b0a.appspot.com/o/images%2FJ84hsF1xAhNrC1Y6i3ofUuzqN2z11687042450456.jpg?alt=media&token=accd244c-960a-45f2-a325-a33362d24dec')
			}
		}))
	})

	it('Does logout works properly?', () => {
		cy.get('[data-cy="btn-component"]').eq(1).click().then(() => {
			cy.wait(1000)
			cy.url().should('equal', 'http://localhost:3000/')
			cy.window().its('store').invoke('getState').its('auth').its('user').should('not.have.property', 'email')
		})
	})

	it('Does delete works properly?', () => {
		cy.get('[data-cy="btn-component"]').eq(2).click().then(() => {
			cy.wait(1000)
			cy.url().should('contain', '/auth').then(() => {
				cy.get('[data-cy="login-email"]').type('karakockutlu@gmail.com')
				cy.get('[data-cy="login-password"]').type('123456')
				cy.get('[data-cy="login-form"]').submit().then(() => {
					cy.get('[data-cy="login-error"]').should('include.text', 'User not found.')
				})
			})
		})
	})
})