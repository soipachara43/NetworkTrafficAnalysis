"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitForAuthenticationsToBeLoaded = void 0;

var _authentications = require("../../screens/hosts/authentications");

var _siem_header = require("../../screens/siem_header");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const waitForAuthenticationsToBeLoaded = () => {
  cy.get(_authentications.AUTHENTICATIONS_TABLE).should('exist');
  cy.get(_siem_header.REFRESH_BUTTON).invoke('text').should('not.equal', 'Updating');
};

exports.waitForAuthenticationsToBeLoaded = waitForAuthenticationsToBeLoaded;