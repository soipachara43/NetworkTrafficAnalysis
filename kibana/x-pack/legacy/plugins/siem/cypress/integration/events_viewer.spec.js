"use strict";

var _fields_browser = require("../screens/fields_browser");

var _events = require("../screens/hosts/events");

var _fields_browser2 = require("../tasks/fields_browser");

var _login = require("../tasks/login");

var _main = require("../tasks/hosts/main");

var _events2 = require("../tasks/hosts/events");

var _siem_header = require("../tasks/siem_header");

var _navigation = require("../urls/navigation");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const defaultHeadersInDefaultEcsCategory = [{
  id: '@timestamp'
}, {
  id: 'message'
}, {
  id: 'host.name'
}, {
  id: 'event.action'
}, {
  id: 'user.name'
}, {
  id: 'source.ip'
}, {
  id: 'destination.ip'
}];
describe('Events Viewer', () => {
  context('Fields rendering', () => {
    before(() => {
      (0, _login.loginAndWaitForPage)(_navigation.HOSTS_PAGE);
      (0, _main.openEvents)();
    });
    beforeEach(() => {
      (0, _events2.openEventsViewerFieldsBrowser)();
    });
    afterEach(() => {
      (0, _fields_browser2.closeFieldsBrowser)();
      cy.get(_fields_browser.FIELDS_BROWSER_CONTAINER).should('not.exist');
    });
    it('displays the `default ECS` category (by default)', () => {
      cy.get(_fields_browser.FIELDS_BROWSER_SELECTED_CATEGORY_TITLE).invoke('text').should('eq', 'default ECS');
    });
    it('displays a checked checkbox for all of the default events viewer columns that are also in the default ECS category', () => {
      defaultHeadersInDefaultEcsCategory.forEach(header => cy.get((0, _fields_browser.FIELDS_BROWSER_CHECKBOX)(header.id)).should('be.checked'));
    });
  });
  context('Events viewer query modal', () => {
    before(() => {
      (0, _login.loginAndWaitForPage)(_navigation.HOSTS_PAGE);
      (0, _main.openEvents)();
    });
    after(() => {
      (0, _events2.closeModal)();
      cy.get(_events.INSPECT_MODAL).should('not.exist');
    });
    it('launches the inspect query modal when the inspect button is clicked', () => {
      (0, _events2.waitsForEventsToBeLoaded)();
      (0, _events2.opensInspectQueryModal)();
      cy.get(_events.INSPECT_MODAL).should('exist');
    });
  });
  context('Events viewer fields behaviour', () => {
    before(() => {
      (0, _login.loginAndWaitForPage)(_navigation.HOSTS_PAGE);
      (0, _main.openEvents)();
    });
    beforeEach(() => {
      (0, _events2.openEventsViewerFieldsBrowser)();
    });
    it('adds a field to the events viewer when the user clicks the checkbox', () => {
      const filterInput = 'host.geo.c';
      (0, _fields_browser2.filterFieldsBrowser)(filterInput);
      cy.get(_events.HOST_GEO_CITY_NAME_HEADER).should('not.exist');
      (0, _events2.addsHostGeoCityNameToHeader)();
      (0, _fields_browser2.closeFieldsBrowser)();
      cy.get(_events.HOST_GEO_CITY_NAME_HEADER).should('exist');
    });
    it('resets all fields in the events viewer when `Reset Fields` is clicked', () => {
      const filterInput = 'host.geo.c';
      (0, _fields_browser2.filterFieldsBrowser)(filterInput);
      cy.get(_events.HOST_GEO_COUNTRY_NAME_HEADER).should('not.exist');
      (0, _events2.addsHostGeoCountryNameToHeader)();
      (0, _events2.resetFields)();
      cy.get(_events.HOST_GEO_COUNTRY_NAME_HEADER).should('not.exist');
    });
  });
  context('Events behaviour', () => {
    before(() => {
      (0, _login.loginAndWaitForPage)(_navigation.HOSTS_PAGE);
      (0, _main.openEvents)();
      (0, _events2.waitsForEventsToBeLoaded)();
    });
    afterEach(() => {
      (0, _siem_header.clearSearchBar)();
    });
    it('filters the events by applying filter criteria from the search bar at the top of the page', () => {
      const filterInput = 'aa7ca589f1b8220002f2fc61c64cfbf1'; // this will never match real data

      cy.get(_events.HEADER_SUBTITLE).invoke('text').then(initialNumberOfEvents => {
        (0, _siem_header.kqlSearch)(`${filterInput}{enter}`);
        cy.get(_events.HEADER_SUBTITLE).invoke('text').should('not.equal', initialNumberOfEvents);
      });
    });
    it('loads more events when the load more button is clicked', () => {
      const defaultNumberOfLoadedEvents = '25';
      cy.get(_events.LOCAL_EVENTS_COUNT).invoke('text').should('equal', defaultNumberOfLoadedEvents);
      cy.get(_events.LOAD_MORE).click({
        force: true
      });
      cy.get(_events.LOCAL_EVENTS_COUNT).invoke('text').should('not.equal', defaultNumberOfLoadedEvents);
    });
  });
});