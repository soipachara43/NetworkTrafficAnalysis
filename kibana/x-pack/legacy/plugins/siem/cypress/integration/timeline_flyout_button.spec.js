"use strict";

var _timeline = require("../screens/timeline");

var _all_hosts = require("../tasks/hosts/all_hosts");

var _login = require("../tasks/login");

var _siem_main = require("../tasks/siem_main");

var _timeline2 = require("../tasks/timeline");

var _navigation = require("../urls/navigation");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
describe('timeline flyout button', () => {
  before(() => {
    (0, _login.loginAndWaitForPage)(_navigation.HOSTS_PAGE);
    (0, _all_hosts.waitForAllHostsToBeLoaded)();
  });
  afterEach(() => {
    (0, _siem_main.openTimelineIfClosed)();
    (0, _timeline2.createNewTimeline)();
  });
  it('toggles open the timeline', () => {
    (0, _siem_main.openTimeline)();
    cy.get(_timeline.TIMELINE_FLYOUT_HEADER).should('have.css', 'visibility', 'visible');
  }); // FLAKY: https://github.com/elastic/kibana/issues/60369

  it.skip('sets the flyout button background to euiColorSuccess with a 10% alpha channel when the user starts dragging a host, but is not hovering over the flyout button', () => {
    (0, _all_hosts.dragFirstHostToTimeline)();
    cy.get(_timeline.TIMELINE_NOT_READY_TO_DROP_BUTTON).should('have.css', 'background', 'rgba(1, 125, 115, 0.1) none repeat scroll 0% 0% / auto padding-box border-box');
  });
});