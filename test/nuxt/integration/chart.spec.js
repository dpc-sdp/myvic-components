/// <reference types="cypress" />

describe('Visits chart page', () => {
  it('Should get bar chart', () => {
    cy.visit('/charts/bar-chart')
    cy.get('.yourvic-bar-chart').should('exist')
  })
})
