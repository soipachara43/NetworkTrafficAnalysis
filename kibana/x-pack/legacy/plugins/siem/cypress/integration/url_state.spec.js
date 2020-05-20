"use strict";

var _date_picker = require("../screens/date_picker");

var _all_hosts = require("../screens/hosts/all_hosts");

var _main = require("../screens/hosts/main");

var _siem_header = require("../screens/siem_header");

var _timeline = require("../screens/timeline");

var _login = require("../tasks/login");

var _date_picker2 = require("../tasks/date_picker");

var _all_hosts2 = require("../tasks/hosts/all_hosts");

var _main2 = require("../tasks/hosts/main");

var _flows = require("../tasks/network/flows");

var _siem_header2 = require("../tasks/siem_header");

var _siem_main = require("../tasks/siem_main");

var _timeline2 = require("../tasks/timeline");

var _navigation = require("../urls/navigation");

var _state = require("../urls/state");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const ABSOLUTE_DATE = {
  endTime: '1564691609186',
  endTimeFormat: '2019-08-01T20:33:29.186Z',
  endTimeTimeline: '1564779809186',
  endTimeTimelineFormat: '2019-08-02T21:03:29.186Z',
  endTimeTimelineTyped: 'Aug 02, 2019 @ 21:03:29.186',
  endTimeTyped: 'Aug 01, 2019 @ 14:33:29.186',
  newEndTime: '1564693409186',
  newEndTimeFormat: '2019-08-01T21:03:29.186Z',
  newEndTimeTyped: 'Aug 01, 2019 @ 15:03:29.186',
  newStartTime: '1564691609186',
  newStartTimeFormat: '2019-08-01T20:33:29.186Z',
  newStartTimeTyped: 'Aug 01, 2019 @ 14:33:29.186',
  startTime: '1564689809186',
  startTimeFormat: '2019-08-01T20:03:29.186Z',
  startTimeTimeline: '1564776209186',
  startTimeTimelineFormat: '2019-08-02T20:03:29.186Z',
  startTimeTimelineTyped: 'Aug 02, 2019 @ 14:03:29.186',
  startTimeTyped: 'Aug 01, 2019 @ 14:03:29.186'
};
describe('url state', () => {
  it('sets the global start and end dates from the url', () => {
    (0, _login.loginAndWaitForPageWithoutDateRange)(_state.ABSOLUTE_DATE_RANGE.url);
    cy.get(_date_picker.DATE_PICKER_START_DATE_POPOVER_BUTTON).should('have.attr', 'title', ABSOLUTE_DATE.startTimeFormat);
    cy.get(_date_picker.DATE_PICKER_END_DATE_POPOVER_BUTTON).should('have.attr', 'title', ABSOLUTE_DATE.endTimeFormat);
  });
  it('sets the url state when start and end date are set', () => {
    (0, _login.loginAndWaitForPageWithoutDateRange)(_state.ABSOLUTE_DATE_RANGE.url);
    (0, _date_picker2.setStartDate)(ABSOLUTE_DATE.newStartTimeTyped);
    (0, _date_picker2.updateDates)();
    (0, _flows.waitForIpsTableToBeLoaded)();
    (0, _date_picker2.setEndDate)(ABSOLUTE_DATE.newEndTimeTyped);
    (0, _date_picker2.updateDates)();
    cy.url().should('include', `(global:(linkTo:!(timeline),timerange:(from:${new Date(ABSOLUTE_DATE.newStartTimeTyped).valueOf()},kind:absolute,to:${new Date(ABSOLUTE_DATE.newEndTimeTyped).valueOf()}))`);
  });
  it('sets the timeline start and end dates from the url when locked to global time', () => {
    (0, _login.loginAndWaitForPageWithoutDateRange)(_state.ABSOLUTE_DATE_RANGE.url);
    (0, _siem_main.openTimeline)();
    cy.get(_date_picker.DATE_PICKER_START_DATE_POPOVER_BUTTON_TIMELINE).should('have.attr', 'title', ABSOLUTE_DATE.startTimeFormat);
    cy.get(_date_picker.DATE_PICKER_END_DATE_POPOVER_BUTTON_TIMELINE).should('have.attr', 'title', ABSOLUTE_DATE.endTimeFormat);
  });
  it('sets the timeline start and end dates independently of the global start and end dates when times are unlocked', () => {
    (0, _login.loginAndWaitForPageWithoutDateRange)(_state.ABSOLUTE_DATE_RANGE.urlUnlinked);
    cy.get(_date_picker.DATE_PICKER_START_DATE_POPOVER_BUTTON).should('have.attr', 'title', ABSOLUTE_DATE.startTimeFormat);
    cy.get(_date_picker.DATE_PICKER_END_DATE_POPOVER_BUTTON).should('have.attr', 'title', ABSOLUTE_DATE.endTimeFormat);
    (0, _siem_main.openTimeline)();
    cy.get(_date_picker.DATE_PICKER_START_DATE_POPOVER_BUTTON_TIMELINE).should('have.attr', 'title', ABSOLUTE_DATE.startTimeTimelineFormat);
    cy.get(_date_picker.DATE_PICKER_END_DATE_POPOVER_BUTTON_TIMELINE).should('have.attr', 'title', ABSOLUTE_DATE.endTimeTimelineFormat);
  });
  it('sets the url state when timeline/global date pickers are unlinked and timeline start and end date are set', () => {
    (0, _login.loginAndWaitForPageWithoutDateRange)(_state.ABSOLUTE_DATE_RANGE.urlUnlinked);
    (0, _siem_main.openTimeline)();
    (0, _date_picker2.setTimelineStartDate)(ABSOLUTE_DATE.newStartTimeTyped);
    (0, _date_picker2.updateTimelineDates)();
    (0, _date_picker2.setTimelineEndDate)(ABSOLUTE_DATE.newEndTimeTyped);
    (0, _date_picker2.updateTimelineDates)();
    cy.url().should('include', `timeline:(linkTo:!(),timerange:(from:${new Date(ABSOLUTE_DATE.newStartTimeTyped).valueOf()},kind:absolute,to:${new Date(ABSOLUTE_DATE.newEndTimeTyped).valueOf()}))`);
  });
  it('sets kql on network page', () => {
    (0, _login.loginAndWaitForPageWithoutDateRange)(_state.ABSOLUTE_DATE_RANGE.urlKqlNetworkNetwork);
    cy.get(_siem_header.KQL_INPUT).should('have.attr', 'value', 'source.ip: "10.142.0.9"');
  });
  it('sets kql on hosts page', () => {
    (0, _login.loginAndWaitForPageWithoutDateRange)(_state.ABSOLUTE_DATE_RANGE.urlKqlHostsHosts);
    cy.get(_siem_header.KQL_INPUT).should('have.attr', 'value', 'source.ip: "10.142.0.9"');
  });
  it('sets the url state when kql is set', () => {
    (0, _login.loginAndWaitForPageWithoutDateRange)(_state.ABSOLUTE_DATE_RANGE.url);
    (0, _siem_header2.kqlSearch)('source.ip: "10.142.0.9" {enter}');
    cy.url().should('include', `query=(language:kuery,query:'source.ip:%20%2210.142.0.9%22%20')`);
  });
  it('sets the url state when kql is set and check if href reflect this change', () => {
    (0, _login.loginAndWaitForPageWithoutDateRange)(_state.ABSOLUTE_DATE_RANGE.url);
    (0, _siem_header2.kqlSearch)('source.ip: "10.142.0.9" {enter}');
    (0, _siem_header2.navigateFromHeaderTo)(_siem_header.HOSTS);
    cy.get(_siem_header.NETWORK).should('have.attr', 'href', "#/link-to/network?query=(language:kuery,query:'source.ip:%20%2210.142.0.9%22%20')&timerange=(global:(linkTo:!(timeline),timerange:(from:1564689809186,kind:absolute,to:1564691609186)),timeline:(linkTo:!(global),timerange:(from:1564689809186,kind:absolute,to:1564691609186)))");
  });
  it('sets KQL in host page and detail page and check if href match on breadcrumb, tabs and subTabs', () => {
    (0, _login.loginAndWaitForPageWithoutDateRange)(_state.ABSOLUTE_DATE_RANGE.urlHostNew);
    (0, _siem_header2.kqlSearch)('host.name: "siem-kibana" {enter}');
    (0, _main2.openAllHosts)();
    (0, _all_hosts2.waitForAllHostsToBeLoaded)();
    cy.get(_siem_header.HOSTS).should('have.attr', 'href', "#/link-to/hosts?query=(language:kuery,query:'host.name:%20%22siem-kibana%22%20')&timerange=(global:(linkTo:!(timeline),timerange:(from:1564689809186,kind:absolute,to:1577914409186)),timeline:(linkTo:!(global),timerange:(from:1564689809186,kind:absolute,to:1577914409186)))");
    cy.get(_siem_header.NETWORK).should('have.attr', 'href', "#/link-to/network?query=(language:kuery,query:'host.name:%20%22siem-kibana%22%20')&timerange=(global:(linkTo:!(timeline),timerange:(from:1564689809186,kind:absolute,to:1577914409186)),timeline:(linkTo:!(global),timerange:(from:1564689809186,kind:absolute,to:1577914409186)))");
    cy.get(_all_hosts.HOSTS_NAMES).first().invoke('text').should('eq', 'siem-kibana');
    (0, _all_hosts2.openFirstHostDetails)();
    (0, _siem_header2.clearSearchBar)();
    (0, _siem_header2.kqlSearch)('agent.type: "auditbeat" {enter}');
    cy.get(_main.ANOMALIES_TAB).should('have.attr', 'href', "#/hosts/siem-kibana/anomalies?query=(language:kuery,query:'agent.type:%20%22auditbeat%22%20')&timerange=(global:(linkTo:!(timeline),timerange:(from:1564689809186,kind:absolute,to:1577914409186)),timeline:(linkTo:!(global),timerange:(from:1564689809186,kind:absolute,to:1577914409186)))");
    cy.get(_siem_header.BREADCRUMBS).eq(1).should('have.attr', 'href', "#/link-to/hosts?query=(language:kuery,query:'agent.type:%20%22auditbeat%22%20')&timerange=(global:(linkTo:!(timeline),timerange:(from:1564689809186,kind:absolute,to:1577914409186)),timeline:(linkTo:!(global),timerange:(from:1564689809186,kind:absolute,to:1577914409186)))");
    cy.get(_siem_header.BREADCRUMBS).eq(2).should('have.attr', 'href', "#/link-to/hosts/siem-kibana?query=(language:kuery,query:'agent.type:%20%22auditbeat%22%20')&timerange=(global:(linkTo:!(timeline),timerange:(from:1564689809186,kind:absolute,to:1577914409186)),timeline:(linkTo:!(global),timerange:(from:1564689809186,kind:absolute,to:1577914409186)))");
  });
  it('Do not clears kql when navigating to a new page', () => {
    (0, _login.loginAndWaitForPageWithoutDateRange)(_state.ABSOLUTE_DATE_RANGE.urlKqlHostsHosts);
    (0, _siem_header2.navigateFromHeaderTo)(_siem_header.NETWORK);
    cy.get(_siem_header.KQL_INPUT).should('have.attr', 'value', 'source.ip: "10.142.0.9"');
  });
  it('sets and reads the url state for timeline by id', () => {
    (0, _login.loginAndWaitForPage)(_navigation.HOSTS_PAGE);
    (0, _siem_main.openTimeline)();
    (0, _timeline2.executeTimelineKQL)('host.name: *');
    cy.get(_timeline.SERVER_SIDE_EVENT_COUNT).invoke('text').then(strCount => {
      const intCount = +strCount;
      cy.wrap(intCount).should('be.above', 0);
    });
    const timelineName = 'SIEM';
    (0, _timeline2.addNameToTimeline)(timelineName);
    (0, _timeline2.addDescriptionToTimeline)('This is the best timeline of the world');
    cy.wait(5000);
    cy.url({
      timeout: 30000
    }).should('match', /\w*-\w*-\w*-\w*-\w*/);
    cy.url().then(url => {
      const matched = url.match(/\w*-\w*-\w*-\w*-\w*/);
      const newTimelineId = matched && matched.length > 0 ? matched[0] : 'null';
      expect(matched).to.have.lengthOf(1);
      (0, _timeline2.closeTimeline)();
      cy.visit('/app/kibana');
      cy.visit(`/app/siem#/overview?timeline\=(id:'${newTimelineId}',isOpen:!t)`);
      cy.contains('a', 'SIEM');
      cy.get(_date_picker.DATE_PICKER_APPLY_BUTTON_TIMELINE).invoke('text').should('not.equal', 'Updating');
      cy.get(_timeline.TIMELINE_TITLE).should('have.attr', 'value', timelineName);
    });
  });
});