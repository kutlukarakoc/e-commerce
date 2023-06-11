import React from 'react'
import Button from './index'

describe('Button component', () => {

	// variant and color test
	it('Does it display children?', () => {
		cy.mount(<Button>Add to cart</Button>)
		cy.get('button').should('contain.text', 'Add to cart')
	})
	it('Does it add classes for filled indigo?', () => {
		cy.mount(<Button variant='filled' color='indigo'>Children</Button>)
		cy.get('button').should('have.class', 'bg-indigo-600 hover:bg-indigo-500 text-white')
	})
	it('Does it add classes for outline indigo?', () => {
		cy.mount(<Button variant='outline' color='indigo'>Children</Button>)
		cy.get('button').should('have.class', 'border border-solid border-indigo-600 text-indigo-600')
	})
	it('Does it add classes for outline red?', () => {
		cy.mount(<Button variant='outline' color='red'>Children</Button>)
		cy.get('button').should('have.class', 'border border-solid border-red-600 text-red-600')
	})

	// font size test
	it('Does it add classes for sm size?', () => {
		cy.mount(<Button size='sm'>Children</Button>)
		cy.get('button').should('have.class', 'text-sm')
	})
	it('Does it add classes for md size?', () => {
		cy.mount(<Button size='md'>Children</Button>)
		cy.get('button').should('have.class', 'text-base')
	})
	it('Does it add classes for lg size?', () => {
		cy.mount(<Button size='lg'>Children</Button>)
		cy.get('button').should('have.class', 'text-lg')
	})

	// rest test
	it('Does it add rest properties?', () => {
		cy.mount(<Button className='py-4 px-8' accessKey='test'>Children</Button>)
		cy.get('button')
			.should('have.class', 'py-4 px-8')
			.should('have.attr', 'accessKey')
	})
	// click test
	it('Does it clickable?', () => {
		cy.mount(<Button onClick={() => console.log('test')}>Children</Button>)
		cy.get('button').click()
	})

})