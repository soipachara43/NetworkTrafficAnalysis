"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dragAndDropIdToggleFieldToTimeline = exports.uncheckTimestampToggleField = exports.populateTimeline = exports.openTimelineSettings = exports.openTimelineInspectButton = exports.openTimelineFieldsBrowser = exports.expandFirstTimelineEventDetails = exports.executeTimelineKQL = exports.createNewTimeline = exports.closeTimeline = exports.checkIdToggleField = exports.addNameToTimeline = exports.addDescriptionToTimeline = exports.hostExistsQuery = void 0;

var _date_picker = require("../screens/date_picker");

var _timeline = require("../screens/timeline");

var _common = require("../tasks/common");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const hostExistsQuery = 'host.name: *';
exports.hostExistsQuery = hostExistsQuery;

const addDescriptionToTimeline = description => {
  cy.get(_timeline.TIMELINE_DESCRIPTION).type(`${description}{enter}`);
  cy.get(_date_picker.DATE_PICKER_APPLY_BUTTON_TIMELINE).click().invoke('text').should('not.equal', 'Updating');
};

exports.addDescriptionToTimeline = addDescriptionToTimeline;

const addNameToTimeline = name => {
  cy.get(_timeline.TIMELINE_TITLE).type(`${name}{enter}`);
  cy.get(_timeline.TIMELINE_TITLE).should('have.attr', 'value', name);
};

exports.addNameToTimeline = addNameToTimeline;

const checkIdToggleField = () => {
  cy.get(_timeline.ID_HEADER_FIELD).should('not.exist');
  cy.get(_timeline.ID_TOGGLE_FIELD).check({
    force: true
  });
};

exports.checkIdToggleField = checkIdToggleField;

const closeTimeline = () => {
  cy.get(_timeline.CLOSE_TIMELINE_BTN).click({
    force: true
  });
};

exports.closeTimeline = closeTimeline;

const createNewTimeline = () => {
  cy.get(_timeline.TIMELINE_SETTINGS_ICON).click({
    force: true
  });
  cy.get(_timeline.CREATE_NEW_TIMELINE).click();
  cy.get(_timeline.CLOSE_TIMELINE_BTN).click({
    force: true
  });
};

exports.createNewTimeline = createNewTimeline;

const executeTimelineKQL = query => {
  cy.get(`${_timeline.SEARCH_OR_FILTER_CONTAINER} input`).type(`${query} {enter}`);
};

exports.executeTimelineKQL = executeTimelineKQL;

const expandFirstTimelineEventDetails = () => {
  cy.get(_timeline.TOGGLE_TIMELINE_EXPAND_EVENT).first().click({
    force: true
  });
};

exports.expandFirstTimelineEventDetails = expandFirstTimelineEventDetails;

const openTimelineFieldsBrowser = () => {
  cy.get(_timeline.TIMELINE_FIELDS_BUTTON).click({
    force: true
  });
};

exports.openTimelineFieldsBrowser = openTimelineFieldsBrowser;

const openTimelineInspectButton = () => {
  cy.get(_timeline.TIMELINE_INSPECT_BUTTON).should('not.be.disabled');
  cy.get(_timeline.TIMELINE_INSPECT_BUTTON).trigger('click', {
    force: true
  });
};

exports.openTimelineInspectButton = openTimelineInspectButton;

const openTimelineSettings = () => {
  cy.get(_timeline.TIMELINE_SETTINGS_ICON).trigger('click', {
    force: true
  });
};

exports.openTimelineSettings = openTimelineSettings;

const populateTimeline = () => {
  executeTimelineKQL(hostExistsQuery);
  cy.get(_timeline.SERVER_SIDE_EVENT_COUNT).invoke('text').then(strCount => {
    const intCount = +strCount;
    cy.wrap(intCount).should('be.above', 0);
  });
};

exports.populateTimeline = populateTimeline;

const uncheckTimestampToggleField = () => {
  cy.get(_timeline.TIMESTAMP_TOGGLE_FIELD).should('exist');
  cy.get(_timeline.TIMESTAMP_TOGGLE_FIELD).uncheck({
    force: true
  });
};

exports.uncheckTimestampToggleField = uncheckTimestampToggleField;

const dragAndDropIdToggleFieldToTimeline = () => {
  cy.get(_timeline.ID_HEADER_FIELD).should('not.exist');
  cy.get(_timeline.ID_FIELD).then(field => (0, _common.drag)(field));
  cy.get(`[data-test-subj="timeline"] [data-test-subj="headers-group"]`).then(headersDropArea => (0, _common.drop)(headersDropArea));
};

exports.dragAndDropIdToggleFieldToTimeline = dragAndDropIdToggleFieldToTimeline;