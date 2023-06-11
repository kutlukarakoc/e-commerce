import React from 'react'
import { useState } from 'react'
import Input from './index'

describe('Input component', () => {

	// label test
	it('Does it display label properly?', () => {
		cy.mount(<Input label='label test' name='testName' />)
		cy.get('label').should('have.attr', 'for', 'testName')
		cy.get('label').should('contain.text', 'label test')
	})

	// error test
	it('Does it display error properly?', () => {
		cy.mount(<Input error='error test' />)
		cy.get('p').should('contain.text', 'error test')
	})

	// focus test
	it('Does focus works properly?', () => {
		cy.mount(<Input />)
		cy.get('input').focus()
		cy.get('input').should('have.class', 'focus:border-indigo-600')
	})

	// placeholder test
	it('Does placeholder display properly?', () => {
		cy.mount(<Input placeholder='test placeholder' />)
		cy.get('input').should('attr', 'placeholder', 'test placeholder')
	})

})