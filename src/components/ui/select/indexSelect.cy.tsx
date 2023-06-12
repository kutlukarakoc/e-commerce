import React from 'react'
import Select from './index'
import { categoryFilters } from '../../../constants/filter/filterConstants'

describe('Select Component', () => {

  it('Does it display content properly?', () => {
    cy.mount(<Select title={categoryFilters.title} contents={categoryFilters.contents} initialTitle='' />)
    cy.get('[data-cy="container"]').as('container')
    cy.get('[data-cy="content-wrapper"]').as('wrapper')
    cy.get('[data-cy="toggle"]').as('toggle')
    
    cy.get('@wrapper').should('have.class', 'max-h-0')
    cy.get('@container').should('have.class', 'h-15')
    cy.get('@toggle').click()
    cy.get('@container').should('have.not.class', 'h-15')
    cy.get('@wrapper').should('have.class', 'max-h-40')
  })

  it('Does it select content properly?', () => {
    cy.mount(<Select title={categoryFilters.title} contents={categoryFilters.contents} initialTitle='' />)
    cy.get('[data-cy="toggle"]').as('toggle')
    cy.get('[data-cy="selected"]').as('selected')
    cy.get('[data-cy="content"]').as('content')
    
    cy.get('@toggle').click()
    cy.get('@content').eq(0).click()
    cy.get('@selected').should('have.class', 'text-indigo-600')
    cy.get('@selected').should('have.text', 'Electronics')

  })
})