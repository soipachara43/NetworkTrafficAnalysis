"use strict";

var _siem_header = require("../screens/siem_header");

var _login = require("../tasks/login");

var _siem_header2 = require("../tasks/siem_header");

var _navigation = require("../urls/navigation");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
describe('top-level navigation common to all pages in the SIEM app', () => {
  before(() => {
    (0, _login.loginAndWaitForPage)(_navigation.TIMELINES_PAGE);
  });
  it('navigates to the Overview page', () => {
    (0, _siem_header2.navigateFromHeaderTo)(_siem_header.OVERVIEW);
    cy.url().should('include', '/siem#/overview');
  });
  it('navigates to the Hosts page', () => {
    (0, _siem_header2.navigateFromHeaderTo)(_siem_header.HOSTS);
    cy.url().should('include', '/siem#/hosts');
  });
  it('navigates to the Network page', () => {
    (0, _siem_header2.navigateFromHeaderTo)(_siem_header.NETWORK);
    cy.url().should('include', '/siem#/network');
  });
  it('navigates to the Detections page', () => {
    (0, _siem_header2.navigateFromHeaderTo)(_siem_header.DETECTIONS);
    cy.url().should('include', '/siem#/detections');
  });
  it('navigates to the Timelines page', () => {
    (0, _siem_header2.navigateFromHeaderTo)(_siem_header.TIMELINES);
    cy.url().should('include', '/siem#/timelines');
  });
});