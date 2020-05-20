"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refreshPage = exports.navigateFromHeaderTo = exports.kqlSearch = exports.clearSearchBar = void 0;

var _siem_header = require("../screens/siem_header");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const clearSearchBar = () => {
  cy.get(_siem_header.KQL_INPUT).clear().type('{enter}');
};

exports.clearSearchBar = clearSearchBar;

const kqlSearch = search => {
  cy.get(_siem_header.KQL_INPUT).type(search);
};

exports.kqlSearch = kqlSearch;

const navigateFromHeaderTo = page => {
  cy.get(page).click({
    force: true
  });
};

exports.navigateFromHeaderTo = navigateFromHeaderTo;

const refreshPage = () => {
  cy.get(_siem_header.REFRESH_BUTTON).click({
    force: true
  }).invoke('text').should('not.equal', 'Updating');
};

exports.refreshPage = refreshPage;