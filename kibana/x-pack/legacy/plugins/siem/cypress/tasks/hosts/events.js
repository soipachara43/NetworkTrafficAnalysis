"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitsForEventsToBeLoaded = exports.resetFields = exports.opensInspectQueryModal = exports.openEventsViewerFieldsBrowser = exports.loadMoreEvents = exports.closeModal = exports.addsHostGeoCountryNameToHeader = exports.addsHostGeoCityNameToHeader = void 0;

var _events = require("../../screens/hosts/events");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const addsHostGeoCityNameToHeader = () => {
  cy.get(_events.HOST_GEO_CITY_NAME_CHECKBOX).check({
    force: true
  });
};

exports.addsHostGeoCityNameToHeader = addsHostGeoCityNameToHeader;

const addsHostGeoCountryNameToHeader = () => {
  cy.get(_events.HOST_GEO_COUNTRY_NAME_CHECKBOX).check({
    force: true
  });
};

exports.addsHostGeoCountryNameToHeader = addsHostGeoCountryNameToHeader;

const closeModal = () => {
  cy.get(_events.CLOSE_MODAL).click();
};

exports.closeModal = closeModal;

const loadMoreEvents = () => {
  cy.get(_events.LOAD_MORE).click({
    force: true
  });
};

exports.loadMoreEvents = loadMoreEvents;

const openEventsViewerFieldsBrowser = () => {
  cy.get(_events.EVENTS_VIEWER_FIELDS_BUTTON).click({
    force: true
  });
  cy.get(_events.SERVER_SIDE_EVENT_COUNT).invoke('text').should('not.equal', '0');
  cy.get(_events.FIELDS_BROWSER_CONTAINER).should('exist');
};

exports.openEventsViewerFieldsBrowser = openEventsViewerFieldsBrowser;

const opensInspectQueryModal = () => {
  cy.get(_events.INSPECT_QUERY).should('exist').trigger('mousemove', {
    force: true
  }).click({
    force: true
  });
};

exports.opensInspectQueryModal = opensInspectQueryModal;

const resetFields = () => {
  cy.get(_events.RESET_FIELDS).click({
    force: true
  });
};

exports.resetFields = resetFields;

const waitsForEventsToBeLoaded = () => {
  cy.get(_events.SERVER_SIDE_EVENT_COUNT).should('exist').invoke('text').should('not.equal', '0');
};

exports.waitsForEventsToBeLoaded = waitsForEventsToBeLoaded;