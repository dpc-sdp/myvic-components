/* eslint-disable no-unused-expressions, jest/valid-expect */
/// <reference types="cypress" />

describe('Proxy server', () => {
  it('Should able to proxy "/abs/" to "api.data.abs.gov.au" site', () => {
    const requestOptions = {
      url: '/abs/data/POPULATION_CLOCK/1+3+6.2.Q.NUM?startPeriod=2022-Q4&detail=Full&dimensionAtObservation=AllDimensions',
      headers: { accept: 'application/vnd.sdmx.data+json' }
    }
    cy.request(requestOptions).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data.dataSets).to.exist
    })
  })
})
