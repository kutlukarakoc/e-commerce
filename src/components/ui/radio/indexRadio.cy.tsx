import React from 'react'
import Radio from './index'
import {genderConstants} from '../../../constants/profile/radioConstants'

describe('Radio component', () => {

	it('Does it display selected option when clicked', () => {
		const onChange = cy.stub()
		cy.mount(<Radio name="gender" onChange={onChange} options={genderConstants} selected="male" />)
		cy.get('input').first().check({ force: true }).then(() => {
			cy.get('input').first().should('be.checked')
		})
	})

	it('Does it call onChange callback when an option is selected?', () => {
		const onChange = cy.stub()
		cy.mount(<Radio name="gender" options={genderConstants} selected="" onChange={onChange} />)
		cy.get('input').first().check({ force: true }).then(() => {
			expect(onChange).to.be.calledOnce
		})
	})
})