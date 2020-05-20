"use strict";

var _steps = require("cypress-cucumber-preprocessor/steps");

var _helpers = require("../../integration/helpers");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
(0, _steps.Given)(`a user browses the APM UI application`, () => {
  // open service overview page
  (0, _helpers.loginAndWaitForPage)(`/app/apm#/services`);
});
(0, _steps.When)(`the user inspects the opbeans-node service`, () => {
  // click opbeans-node service
  cy.get(':contains(opbeans-node)').last().click({
    force: true
  });
});
(0, _steps.Then)(`should redirect to correct path with correct params`, () => {
  cy.url().should('contain', `/app/apm#/services/opbeans-node/transactions`);
  cy.url().should('contain', `transactionType=request`);
});
(0, _steps.Then)(`should have correct y-axis ticks`, () => {
  const yAxisTick = '[data-cy=transaction-duration-charts] .rv-xy-plot__axis--vertical .rv-xy-plot__axis__tick__text';
  cy.get(yAxisTick).eq(2).invoke('text').snapshot();
  cy.get(yAxisTick).eq(1).invoke('text').snapshot();
  cy.get(yAxisTick).eq(0).invoke('text').snapshot();
});