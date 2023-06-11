import React from 'react'
import Accordion from './index'
import { shippingConstants } from '../../../constants/product/accordionConstants'

describe('Accordion Component', () => {

	// type tests
	it('Does it display list type properly?', () => {
		cy.mount(<Accordion title={shippingConstants.title} contents={shippingConstants.contents} type='list' />)
		cy.get('li').should('have.class', 'before:absolute')
	})
	it('Does it display links type properly?', () => {
		cy.mount(<Accordion title={shippingConstants.title} contents={shippingConstants.contents} type='links' />)
		cy.get('li').should('have.not.class', 'before:absolute')
	})

	// toggle tests
	it('Does it toggle properly?', () => {
		cy.mount(<Accordion title={shippingConstants.title} contents={shippingConstants.contents} type='links' />)
		cy.get('button span').should('have.not.class', 'text-indigo-600')
		cy.get('div').should('have.class', 'overflow-hidden')
		cy.get('button').click()
		cy.get('div').should('have.not.class', 'overflow-hidden')
		cy.get('button span').should('have.class', 'text-indigo-600')
		cy.get('button').click()
		cy.get('button span').should('have.not.class', 'text-indigo-600')
		cy.get('div').should('have.class', 'overflow-hidden')
	})

})