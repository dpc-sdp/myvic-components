/// <reference types="cypress" />

describe('Visits map page', () => {
  it('Should get map core', () => {
    cy.visit('/maps/map-core')
    cy.get('.yourvic-map-core').should('exist')
  })
})

describe('Visits maps page', () => {
  before(() => {
    cy.visit('/maps/maps')
  })
  it('Should get fire map', () => {
    cy.get('.fire-map').should('exist')
  })
  it('Should get free wifi map', () => {
    cy.get('.yourvic-free-wifi-map').should('exist')
  })
  it('Should get family violence prevention map', () => {
    cy.get('.yourvic-pofvmap').should('exist')
  })
})
