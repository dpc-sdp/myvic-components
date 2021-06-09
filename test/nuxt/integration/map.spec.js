/// <reference types="cypress" />

describe('Visit map page', () => {
  it('Should get map core', () => {
    cy.visit('/maps/map-core')
    cy.get('.myvic-map-core').should('exist')
  })
})
