import React from 'react'
import Divider from './index'

describe('Divider Component', () => {

	// variant test
	it('Does it have normal variant classes?', () => {
		cy.mount(<Divider />)
		cy.get('div').should('have.class', 'border-gray-500')
	})
	it('Does it have soft variant classes?', () => {
		cy.mount(<Divider variant='soft' />)
		cy.get('div').should('have.class', 'border-gray-300')
	})

	// additional styles test
	it('Does it add the styles prop as a class?', () => {
		cy.mount(<Divider styles='my-5' />)
		cy.get('div').should('have.class', 'my-5')
	})

})