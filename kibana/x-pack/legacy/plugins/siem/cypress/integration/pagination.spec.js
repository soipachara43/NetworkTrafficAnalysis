"use strict";

var _uncommon_processes = require("../screens/hosts/uncommon_processes");

var _pagination = require("../screens/pagination");

var _authentications = require("../tasks/hosts/authentications");

var _main = require("../tasks/hosts/main");

var _uncommon_processes2 = require("../tasks/hosts/uncommon_processes");

var _login = require("../tasks/login");

var _pagination2 = require("../tasks/pagination");

var _siem_header = require("../tasks/siem_header");

var _navigation = require("../urls/navigation");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
describe('Pagination', () => {
  before(() => {
    (0, _login.loginAndWaitForPage)(_navigation.HOSTS_PAGE_TAB_URLS.uncommonProcesses);
    (0, _uncommon_processes2.waitForUncommonProcessesToBeLoaded)();
  });
  afterEach(() => {
    (0, _pagination2.goToFirstPage)();
  });
  it('pagination updates results and page number', () => {
    cy.get(_pagination.FIRST_PAGE_SELECTOR).should('have.class', 'euiPaginationButton-isActive');
    cy.get(_uncommon_processes.PROCESS_NAME_FIELD).first().invoke('text').then(processNameFirstPage => {
      (0, _pagination2.goToThirdPage)();
      (0, _uncommon_processes2.waitForUncommonProcessesToBeLoaded)();
      cy.get(_uncommon_processes.PROCESS_NAME_FIELD).first().invoke('text').should(processNameSecondPage => {
        expect(processNameFirstPage).not.to.eq(processNameSecondPage);
      });
    });
    cy.get(_pagination.FIRST_PAGE_SELECTOR).should('not.have.class', 'euiPaginationButton-isActive');
    cy.get(_pagination.THIRD_PAGE_SELECTOR).should('have.class', 'euiPaginationButton-isActive');
  });
  it('pagination keeps track of page results when tabs change', () => {
    cy.get(_pagination.FIRST_PAGE_SELECTOR).should('have.class', 'euiPaginationButton-isActive');
    (0, _pagination2.goToThirdPage)();
    (0, _uncommon_processes2.waitForUncommonProcessesToBeLoaded)();
    cy.get(_uncommon_processes.PROCESS_NAME_FIELD).first().invoke('text').then(expectedThirdPageResult => {
      (0, _main.openAuthentications)();
      (0, _authentications.waitForAuthenticationsToBeLoaded)();
      cy.get(_pagination.FIRST_PAGE_SELECTOR).should('have.class', 'euiPaginationButton-isActive');
      (0, _main.openUncommonProcesses)();
      (0, _uncommon_processes2.waitForUncommonProcessesToBeLoaded)();
      cy.get(_pagination.THIRD_PAGE_SELECTOR).should('have.class', 'euiPaginationButton-isActive');
      cy.get(_uncommon_processes.PROCESS_NAME_FIELD).first().invoke('text').should(actualThirdPageResult => {
        expect(expectedThirdPageResult).to.eq(actualThirdPageResult);
      });
    });
  });
  it('pagination resets results and page number to first page when refresh is clicked', () => {
    cy.get(_pagination.FIRST_PAGE_SELECTOR).should('have.class', 'euiPaginationButton-isActive');
    (0, _pagination2.goToThirdPage)();
    (0, _uncommon_processes2.waitForUncommonProcessesToBeLoaded)();
    cy.get(_pagination.FIRST_PAGE_SELECTOR).should('not.have.class', 'euiPaginationButton-isActive');
    (0, _siem_header.refreshPage)();
    (0, _uncommon_processes2.waitForUncommonProcessesToBeLoaded)();
    cy.get(_pagination.FIRST_PAGE_SELECTOR).should('have.class', 'euiPaginationButton-isActive');
  });
});