import React from 'react'
import Divider from './index'

describe('Divider Component', () => {

  it('Does it have normal variant classes?', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Divider />)
    cy.get('div').should('have.class', 'border-gray-500')
  })

  it('Does it have soft variant classes?', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Divider variant='soft' />)
    cy.get('div').should('have.class', 'border-gray-300')
  })

  it('Does it add the styles prop as a class?', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Divider styles='my-5' />)
    cy.get('div').should('have.class', 'my-5')
  })
})