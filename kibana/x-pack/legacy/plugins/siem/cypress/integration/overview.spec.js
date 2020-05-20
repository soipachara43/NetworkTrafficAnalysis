"use strict";

var _overview = require("../screens/overview");

var _overview2 = require("../tasks/overview");

var _login = require("../tasks/login");

var _navigation = require("../urls/navigation");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
describe('Overview Page', () => {
  before(() => {
    cy.stubSIEMapi('overview');
    (0, _login.loginAndWaitForPage)(_navigation.OVERVIEW_PAGE);
  });
  it('Host stats render with correct values', () => {
    (0, _overview2.expandHostStats)();

    _overview.HOST_STATS.forEach(stat => {
      cy.get(stat.domId).invoke('text').should('eq', stat.value);
    });
  });
  it('Network stats render with correct values', () => {
    (0, _overview2.expandNetworkStats)();

    _overview.NETWORK_STATS.forEach(stat => {
      cy.get(stat.domId).invoke('text').should('eq', stat.value);
    });
  });
});