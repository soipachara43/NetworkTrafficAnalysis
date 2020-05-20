"use strict";

var _timeline = require("../screens/timeline");

var _all_hosts = require("../screens/hosts/all_hosts");

var _all_hosts2 = require("../tasks/hosts/all_hosts");

var _login = require("../tasks/login");

var _siem_main = require("../tasks/siem_main");

var _timeline2 = require("../tasks/timeline");

var _navigation = require("../urls/navigation");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
describe('timeline data providers', () => {
  before(() => {
    (0, _login.loginAndWaitForPage)(_navigation.HOSTS_PAGE);
    (0, _all_hosts2.waitForAllHostsToBeLoaded)();
  });
  beforeEach(() => {
    (0, _siem_main.openTimeline)();
  });
  afterEach(() => {
    (0, _timeline2.createNewTimeline)();
  });
  it('renders the data provider of a host dragged from the All Hosts widget on the hosts page', () => {
    (0, _all_hosts2.dragAndDropFirstHostToTimeline)();
    cy.get(_timeline.TIMELINE_DROPPED_DATA_PROVIDERS).first().invoke('text').then(dataProviderText => {
      cy.get(_all_hosts.HOSTS_NAMES_DRAGGABLE).first().invoke('text').should(hostname => {
        expect(dataProviderText).to.eq(`host.name: "${hostname}"`);
      });
    });
  });
  it('sets the background to euiColorSuccess with a 10% alpha channel when the user starts dragging a host, but is not hovering over the data providers', () => {
    (0, _all_hosts2.dragFirstHostToTimeline)();
    cy.get(_timeline.TIMELINE_DATA_PROVIDERS).should('have.css', 'background', 'rgba(1, 125, 115, 0.1) none repeat scroll 0% 0% / auto padding-box border-box');
  });
  it.skip('sets the background to euiColorSuccess with a 20% alpha channel and renders the dashed border color as euiColorSuccess when the user starts dragging a host AND is hovering over the data providers', () => {
    (0, _all_hosts2.dragFirstHostToEmptyTimelineDataProviders)();
    cy.get(_timeline.TIMELINE_DATA_PROVIDERS_EMPTY).should('have.css', 'background', 'rgba(1, 125, 115, 0.2) none repeat scroll 0% 0% / auto padding-box border-box');
    cy.get(_timeline.TIMELINE_DATA_PROVIDERS).should('have.css', 'border', '3.1875px dashed rgb(1, 125, 115)');
  });
});