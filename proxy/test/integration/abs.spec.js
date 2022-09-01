/* eslint-disable no-unused-expressions, jest/valid-expect */
/// <reference types="cypress" />

describe('Proxy server', () => {
  it('Should able to proxy "/abs/" to "api.data.abs.gov.au" site', () => {
    cy.request('/abs/data/POPULATION_CLOCK/1+3+6.2.Q.NUM?startPeriod=2022-Q4&detail=Full&dimensionAtObservation=AllDimensions').as('data')
    cy.get('@data').should((response) => {
      expect(response.body.dataSets).to.exist
    })
  })
})
