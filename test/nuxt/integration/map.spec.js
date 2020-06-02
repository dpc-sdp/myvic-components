/// <reference types="cypress" />

describe('Visits map page', () => {
  it('Should get map core', () => {
    cy.visit('/map')
    cy.get('.yourvic-map-core').should('exist')
  })
})
