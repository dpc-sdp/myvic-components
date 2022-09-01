/* eslint-disable no-unused-expressions, jest/valid-expect */
/// <reference types="cypress" />

describe('Proxy server', () => {
  it('Should able to proxy "/abs/" to "api.data.abs.gov.au" site', () => {
    cy.request('/abs/data/POPULATION_CLOCK_FY/1+3+6.2.Q/all?detail=Full&dimensionAtObservation=AllDimensions').as('data')
    cy.get('@data').should((response) => {
      expect(response.body.dataSets).to.exist
    })
  })
})
