"use strict";

var _timeline = require("../screens/timeline");

var _login = require("../tasks/login");

var _siem_main = require("../tasks/siem_main");

var _timeline2 = require("../tasks/timeline");

var _navigation = require("../urls/navigation");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
describe('timeline search or filter KQL bar', () => {
  beforeEach(() => {
    (0, _login.loginAndWaitForPage)(_navigation.HOSTS_PAGE);
  });
  it('executes a KQL query', () => {
    const hostExistsQuery = 'host.name: *';
    (0, _siem_main.openTimeline)();
    (0, _timeline2.executeTimelineKQL)(hostExistsQuery);
    cy.get(_timeline.SERVER_SIDE_EVENT_COUNT).invoke('text').then(strCount => {
      const intCount = +strCount;
      cy.wrap(intCount).should('be.above', 0);
    });
  });
});