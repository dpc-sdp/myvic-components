/* global cy */

import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

Given(`I visit the Vue router path {string}`, url => {
  cy.visit(url, {
    failOnStatusCode: false
  })
})

Then(`the example ripple components should exist`, () => {
  cy.get('.rpl-site-layout').should('exist')
  cy.get('.rpl-site-header-container').should('exist')
})

Then(`the example ripple components should exist`, () => {
  cy.get('.rpl-site-layout').should('exist')
  cy.get('.rpl-site-header-container').should('exist')
})
