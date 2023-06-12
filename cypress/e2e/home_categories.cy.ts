describe('Categories Tests', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-cy="banner"]').as('banner')
  })

  it('Does first banner redirect to correct url?', () => {
    cy.get('@banner').eq(0).click()
    cy.url().should('include', '/products/category/women\'s%20clothing')
  })

  it('Does second banner redirect to correct url?', () => {
    cy.get('@banner').eq(1).click()
    cy.url().should('include', '/products/category/men\'s%20clothing')
  })

  it('Does third banner redirect to correct url?', () => {
    cy.get('@banner').eq(2).click()
    cy.url().should('include', '/products/category/jewelery')
  })

  it('Does fourth banner redirect to correct url?', () => {
    cy.get('@banner').eq(3).click()
    cy.url().should('include', '/products/category/electronics')
  })
})