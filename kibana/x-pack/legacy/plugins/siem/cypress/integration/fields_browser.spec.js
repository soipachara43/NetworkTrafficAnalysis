"use strict";

var _fields_browser = require("../screens/fields_browser");

var _fields_browser2 = require("../tasks/fields_browser");

var _login = require("../tasks/login");

var _siem_main = require("../tasks/siem_main");

var _timeline = require("../tasks/timeline");

var _navigation = require("../urls/navigation");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const defaultHeaders = [{
  id: '@timestamp'
}, {
  id: 'message'
}, {
  id: 'event.category'
}, {
  id: 'event.action'
}, {
  id: 'host.name'
}, {
  id: 'source.ip'
}, {
  id: 'destination.ip'
}, {
  id: 'user.name'
}];
describe('Fields Browser', () => {
  context('Fields Browser rendering', () => {
    before(() => {
      (0, _login.loginAndWaitForPage)(_navigation.HOSTS_PAGE);
      (0, _siem_main.openTimeline)();
      (0, _timeline.populateTimeline)();
      (0, _timeline.openTimelineFieldsBrowser)();
    });
    afterEach(() => {
      (0, _fields_browser2.clearFieldsBrowser)();
    });
    it('displays the `default ECS` category (by default)', () => {
      cy.get(_fields_browser.FIELDS_BROWSER_SELECTED_CATEGORY_TITLE).invoke('text').should('eq', 'default ECS');
    });
    it('the `defaultECS` (selected) category count matches the default timeline header count', () => {
      cy.get(_fields_browser.FIELDS_BROWSER_SELECTED_CATEGORY_COUNT).invoke('text').should('eq', `${defaultHeaders.length}`);
    });
    it('displays a checked checkbox for all of the default timeline columns', () => {
      defaultHeaders.forEach(header => cy.get(`[data-test-subj="field-${header.id}-checkbox"]`).should('be.checked'));
    });
    it('displays the expected count of categories that match the filter input', () => {
      const filterInput = 'host.mac';
      (0, _fields_browser2.filterFieldsBrowser)(filterInput);
      cy.get(_fields_browser.FIELDS_BROWSER_CATEGORIES_COUNT).invoke('text').should('eq', '2 categories');
    });
    it('displays a search results label with the expected count of fields matching the filter input', () => {
      const filterInput = 'host.mac';
      (0, _fields_browser2.filterFieldsBrowser)(filterInput);
      cy.get(_fields_browser.FIELDS_BROWSER_HOST_CATEGORIES_COUNT).invoke('text').then(hostCategoriesCount => {
        cy.get(_fields_browser.FIELDS_BROWSER_SYSTEM_CATEGORIES_COUNT).invoke('text').then(systemCategoriesCount => {
          cy.get(_fields_browser.FIELDS_BROWSER_FIELDS_COUNT).invoke('text').should('eq', `${+hostCategoriesCount + +systemCategoriesCount} fields`);
        });
      });
    });
    it('displays a count of only the fields in the selected category that match the filter input', () => {
      const filterInput = 'host.geo.c';
      (0, _fields_browser2.filterFieldsBrowser)(filterInput);
      cy.get(_fields_browser.FIELDS_BROWSER_SELECTED_CATEGORY_COUNT).invoke('text').should('eq', '4');
    });
  });
  context('Editing the timeline', () => {
    before(() => {
      (0, _login.loginAndWaitForPage)(_navigation.HOSTS_PAGE);
      (0, _siem_main.openTimeline)();
      (0, _timeline.populateTimeline)();
      (0, _timeline.openTimelineFieldsBrowser)();
    });
    afterEach(() => {
      (0, _timeline.openTimelineFieldsBrowser)();
      (0, _fields_browser2.clearFieldsBrowser)();
    });
    it('removes the message field from the timeline when the user un-checks the field', () => {
      cy.get(_fields_browser.FIELDS_BROWSER_MESSAGE_HEADER).should('exist');
      (0, _fields_browser2.removesMessageField)();
      (0, _fields_browser2.closeFieldsBrowser)();
      cy.get(_fields_browser.FIELDS_BROWSER_MESSAGE_HEADER).should('not.exist');
    });
    it('selects a search results label with the expected count of categories matching the filter input', () => {
      const category = 'host';
      (0, _fields_browser2.filterFieldsBrowser)(category);
      cy.get(_fields_browser.FIELDS_BROWSER_SELECTED_CATEGORY_TITLE).invoke('text').should('eq', category);
    });
    it('adds a field to the timeline when the user clicks the checkbox', () => {
      const filterInput = 'host.geo.c';
      (0, _fields_browser2.filterFieldsBrowser)(filterInput);
      cy.get(_fields_browser.FIELDS_BROWSER_HOST_GEO_CITY_NAME_HEADER).should('not.exist');
      (0, _fields_browser2.addsHostGeoCityNameToTimeline)();
      (0, _fields_browser2.closeFieldsBrowser)();
      cy.get(_fields_browser.FIELDS_BROWSER_HOST_GEO_CITY_NAME_HEADER).should('exist');
    });
    it('adds a field to the timeline when the user drags and drops a field', () => {
      const filterInput = 'host.geo.c';
      (0, _fields_browser2.filterFieldsBrowser)(filterInput);
      cy.get(_fields_browser.FIELDS_BROWSER_HOST_GEO_COUNTRY_NAME_HEADER).should('not.exist');
      (0, _fields_browser2.addsHostGeoCountryNameToTimelineDraggingIt)();
      cy.get(_fields_browser.FIELDS_BROWSER_HOST_GEO_COUNTRY_NAME_HEADER).should('exist');
    });
    it('resets all fields in the timeline when `Reset Fields` is clicked', () => {
      const filterInput = 'host.geo.c';
      (0, _fields_browser2.filterFieldsBrowser)(filterInput);
      cy.get(_fields_browser.FIELDS_BROWSER_HEADER_HOST_GEO_CONTINENT_NAME_HEADER).should('not.exist');
      (0, _fields_browser2.addsHostGeoContinentNameToTimeline)();
      (0, _fields_browser2.closeFieldsBrowser)();
      cy.get(_fields_browser.FIELDS_BROWSER_HEADER_HOST_GEO_CONTINENT_NAME_HEADER).should('exist');
      (0, _timeline.openTimelineFieldsBrowser)();
      (0, _fields_browser2.resetFields)();
      cy.get(_fields_browser.FIELDS_BROWSER_HEADER_HOST_GEO_CONTINENT_NAME_HEADER).should('not.exist');
    });
  });
});