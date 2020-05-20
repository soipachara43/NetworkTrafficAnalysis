"use strict";

var _detections = require("../screens/detections");

var _timeline = require("../screens/timeline");

var _detections2 = require("../tasks/detections");

var _es_archiver = require("../tasks/es_archiver");

var _login = require("../tasks/login");

var _navigation = require("../urls/navigation");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
describe('Detections timeline', () => {
  beforeEach(() => {
    (0, _es_archiver.esArchiverLoad)('timeline_signals');
    (0, _login.loginAndWaitForPage)(_navigation.DETECTIONS);
  });
  afterEach(() => {
    (0, _es_archiver.esArchiverUnload)('timeline_signals');
  });
  it('Investigate signal in default timeline', () => {
    (0, _detections2.waitForSignalsPanelToBeLoaded)();
    (0, _detections2.expandFirstSignal)();
    cy.get(_detections.SIGNAL_ID).first().invoke('text').then(eventId => {
      (0, _detections2.investigateFirstSignalInTimeline)();
      cy.get(_timeline.PROVIDER_BADGE).invoke('text').should('eql', `_id: "${eventId}"`);
    });
  });
});