"use strict";

var _inspect = require("../screens/inspect");

var _inspect2 = require("../tasks/inspect");

var _login = require("../tasks/login");

var _siem_main = require("../tasks/siem_main");

var _timeline = require("../tasks/timeline");

var _navigation = require("../urls/navigation");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
describe('Inspect', () => {
  context('Hosts stats and tables', () => {
    before(() => {
      (0, _login.loginAndWaitForPage)(_navigation.HOSTS_PAGE);
    });
    afterEach(() => {
      (0, _inspect2.closesModal)();
    });

    _inspect.INSPECT_HOSTS_BUTTONS_IN_SIEM.forEach(table => it(`inspects the ${table.title}`, () => {
      (0, _inspect2.openStatsAndTables)(table);
      cy.get(_inspect.INSPECT_MODAL).should('be.visible');
    }));
  });
  context('Network stats and tables', () => {
    before(() => {
      (0, _login.loginAndWaitForPage)(_navigation.NETWORK_PAGE);
    });
    afterEach(() => {
      (0, _inspect2.closesModal)();
    });

    _inspect.INSPECT_NETWORK_BUTTONS_IN_SIEM.forEach(table => it(`inspects the ${table.title}`, () => {
      (0, _inspect2.openStatsAndTables)(table);
      cy.get(_inspect.INSPECT_MODAL).should('be.visible');
    }));
  });
  context('Timeline', () => {
    it('inspects the timeline', () => {
      const hostExistsQuery = 'host.name: *';
      (0, _login.loginAndWaitForPage)(_navigation.HOSTS_PAGE);
      (0, _siem_main.openTimeline)();
      (0, _timeline.executeTimelineKQL)(hostExistsQuery);
      (0, _timeline.openTimelineSettings)();
      (0, _timeline.openTimelineInspectButton)();
      cy.get(_inspect.INSPECT_MODAL).should('be.visible');
    });
  });
});