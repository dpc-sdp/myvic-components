/* eslint-disable no-unused-expressions, jest/valid-expect */
/// <reference types="cypress" />

describe('Proxy server', () => {
  it('Should able to proxy "/api-address-suggestions" to API', () => {
    cy.request('/api-address-suggestions?query=100').as('data')
    cy.get('@data').should((response) => {
      expect(response.body.suggestions).to.exist
    })
  })
})
