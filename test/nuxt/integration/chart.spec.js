/// <reference types="cypress" />

describe('Visits chart page', () => {
  it('Should get bar chart', () => {
    cy.visit('/charts/bar-chart')
    cy.get('.myvic-bar-chart', { timeout: 15000 }).should('exist')
  })
})
