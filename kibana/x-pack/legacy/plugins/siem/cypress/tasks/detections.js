"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitForSignalsToBeLoaded = exports.waitForSignalsPanelToBeLoaded = exports.waitForSignalsIndexToBeCreated = exports.waitForSignals = exports.investigateFirstSignalInTimeline = exports.selectNumberOfSignals = exports.openSignals = exports.openFirstSignal = exports.goToOpenedSignals = exports.goToManageSignalDetectionRules = exports.goToClosedSignals = exports.expandFirstSignal = exports.closeSignals = exports.closeFirstSignal = void 0;

var _detections = require("../screens/detections");

var _siem_header = require("../screens/siem_header");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const closeFirstSignal = () => {
  cy.get(_detections.OPEN_CLOSE_SIGNAL_BTN).first().click({
    force: true
  });
};

exports.closeFirstSignal = closeFirstSignal;

const closeSignals = () => {
  cy.get(_detections.OPEN_CLOSE_SIGNALS_BTN).click({
    force: true
  });
};

exports.closeSignals = closeSignals;

const expandFirstSignal = () => {
  cy.get(_detections.EXPAND_SIGNAL_BTN).first().click({
    force: true
  });
};

exports.expandFirstSignal = expandFirstSignal;

const goToClosedSignals = () => {
  cy.get(_detections.CLOSED_SIGNALS_BTN).click({
    force: true
  });
};

exports.goToClosedSignals = goToClosedSignals;

const goToManageSignalDetectionRules = () => {
  cy.get(_detections.MANAGE_SIGNAL_DETECTION_RULES_BTN).should('exist').click({
    force: true
  });
};

exports.goToManageSignalDetectionRules = goToManageSignalDetectionRules;

const goToOpenedSignals = () => {
  cy.get(_detections.OPENED_SIGNALS_BTN).click({
    force: true
  });
};

exports.goToOpenedSignals = goToOpenedSignals;

const openFirstSignal = () => {
  cy.get(_detections.OPEN_CLOSE_SIGNAL_BTN).first().click({
    force: true
  });
};

exports.openFirstSignal = openFirstSignal;

const openSignals = () => {
  cy.get(_detections.OPEN_CLOSE_SIGNALS_BTN).click({
    force: true
  });
};

exports.openSignals = openSignals;

const selectNumberOfSignals = numberOfSignals => {
  for (let i = 0; i < numberOfSignals; i++) {
    cy.get(_detections.SIGNAL_CHECKBOX).eq(i).click({
      force: true
    });
  }
};

exports.selectNumberOfSignals = selectNumberOfSignals;

const investigateFirstSignalInTimeline = () => {
  cy.get(_detections.SEND_SIGNAL_TO_TIMELINE_BTN).first().click({
    force: true
  });
};

exports.investigateFirstSignalInTimeline = investigateFirstSignalInTimeline;

const waitForSignals = () => {
  cy.get(_siem_header.REFRESH_BUTTON).invoke('text').should('not.equal', 'Updating');
};

exports.waitForSignals = waitForSignals;

const waitForSignalsIndexToBeCreated = () => {
  cy.request({
    url: '/api/detection_engine/index',
    retryOnStatusCodeFailure: true
  }).then(response => {
    if (response.status !== 200) {
      cy.wait(7500);
    }
  });
};

exports.waitForSignalsIndexToBeCreated = waitForSignalsIndexToBeCreated;

const waitForSignalsPanelToBeLoaded = () => {
  cy.get(_detections.LOADING_SIGNALS_PANEL).should('exist');
  cy.get(_detections.LOADING_SIGNALS_PANEL).should('not.exist');
};

exports.waitForSignalsPanelToBeLoaded = waitForSignalsPanelToBeLoaded;

const waitForSignalsToBeLoaded = () => {
  const expectedNumberOfDisplayedSignals = 25;
  cy.get(_detections.SIGNALS).should('have.length', expectedNumberOfDisplayedSignals);
};

exports.waitForSignalsToBeLoaded = waitForSignalsToBeLoaded;