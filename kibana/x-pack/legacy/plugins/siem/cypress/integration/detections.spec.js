"use strict";

var _detections = require("../screens/detections");

var _detections2 = require("../tasks/detections");

var _es_archiver = require("../tasks/es_archiver");

var _login = require("../tasks/login");

var _navigation = require("../urls/navigation");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
describe('Detections', () => {
  context('Closing signals', () => {
    beforeEach(() => {
      (0, _es_archiver.esArchiverLoad)('signals');
      (0, _login.loginAndWaitForPage)(_navigation.DETECTIONS);
    });
    it('Closes and opens signals', () => {
      (0, _detections2.waitForSignalsPanelToBeLoaded)();
      (0, _detections2.waitForSignalsToBeLoaded)();
      cy.get(_detections.NUMBER_OF_SIGNALS).invoke('text').then(numberOfSignals => {
        cy.get(_detections.SHOWING_SIGNALS).should('have.text', `Showing ${numberOfSignals} signals`);
        const numberOfSignalsToBeClosed = 3;
        (0, _detections2.selectNumberOfSignals)(numberOfSignalsToBeClosed);
        cy.get(_detections.SELECTED_SIGNALS).should('have.text', `Selected ${numberOfSignalsToBeClosed} signals`);
        (0, _detections2.closeSignals)();
        (0, _detections2.waitForSignals)();
        cy.reload();
        (0, _detections2.waitForSignals)();
        const expectedNumberOfSignalsAfterClosing = +numberOfSignals - numberOfSignalsToBeClosed;
        cy.get(_detections.NUMBER_OF_SIGNALS).should('have.text', expectedNumberOfSignalsAfterClosing.toString());
        cy.get(_detections.SHOWING_SIGNALS).should('have.text', `Showing ${expectedNumberOfSignalsAfterClosing.toString()} signals`);
        (0, _detections2.goToClosedSignals)();
        (0, _detections2.waitForSignals)();
        cy.get(_detections.NUMBER_OF_SIGNALS).should('have.text', numberOfSignalsToBeClosed.toString());
        cy.get(_detections.SHOWING_SIGNALS).should('have.text', `Showing ${numberOfSignalsToBeClosed.toString()} signals`);
        cy.get(_detections.SIGNALS).should('have.length', numberOfSignalsToBeClosed);
        const numberOfSignalsToBeOpened = 1;
        (0, _detections2.selectNumberOfSignals)(numberOfSignalsToBeOpened);
        cy.get(_detections.SELECTED_SIGNALS).should('have.text', `Selected ${numberOfSignalsToBeOpened} signal`);
        (0, _detections2.openSignals)();
        (0, _detections2.waitForSignals)();
        cy.reload();
        (0, _detections2.waitForSignalsToBeLoaded)();
        (0, _detections2.waitForSignals)();
        (0, _detections2.goToClosedSignals)();
        (0, _detections2.waitForSignals)();
        const expectedNumberOfClosedSignalsAfterOpened = 2;
        cy.get(_detections.NUMBER_OF_SIGNALS).should('have.text', expectedNumberOfClosedSignalsAfterOpened.toString());
        cy.get(_detections.SHOWING_SIGNALS).should('have.text', `Showing ${expectedNumberOfClosedSignalsAfterOpened.toString()} signals`);
        cy.get(_detections.SIGNALS).should('have.length', expectedNumberOfClosedSignalsAfterOpened);
        (0, _detections2.goToOpenedSignals)();
        (0, _detections2.waitForSignals)();
        const expectedNumberOfOpenedSignals = +numberOfSignals - expectedNumberOfClosedSignalsAfterOpened;
        cy.get(_detections.SHOWING_SIGNALS).should('have.text', `Showing ${expectedNumberOfOpenedSignals.toString()} signals`);
        cy.get('[data-test-subj="server-side-event-count"]').should('have.text', expectedNumberOfOpenedSignals.toString());
      });
    });
    it('Closes one signal when more than one opened signals are selected', () => {
      (0, _detections2.waitForSignalsToBeLoaded)();
      cy.get(_detections.NUMBER_OF_SIGNALS).invoke('text').then(numberOfSignals => {
        const numberOfSignalsToBeClosed = 1;
        const numberOfSignalsToBeSelected = 3;
        cy.get(_detections.OPEN_CLOSE_SIGNALS_BTN).should('have.attr', 'disabled');
        (0, _detections2.selectNumberOfSignals)(numberOfSignalsToBeSelected);
        cy.get(_detections.OPEN_CLOSE_SIGNALS_BTN).should('not.have.attr', 'disabled');
        (0, _detections2.closeFirstSignal)();
        cy.reload();
        (0, _detections2.waitForSignalsToBeLoaded)();
        (0, _detections2.waitForSignals)();
        const expectedNumberOfSignals = +numberOfSignals - numberOfSignalsToBeClosed;
        cy.get(_detections.NUMBER_OF_SIGNALS).invoke('text').should('eq', expectedNumberOfSignals.toString());
        cy.get(_detections.SHOWING_SIGNALS).invoke('text').should('eql', `Showing ${expectedNumberOfSignals.toString()} signals`);
        (0, _detections2.goToClosedSignals)();
        (0, _detections2.waitForSignals)();
        cy.get(_detections.NUMBER_OF_SIGNALS).invoke('text').should('eql', numberOfSignalsToBeClosed.toString());
        cy.get(_detections.SHOWING_SIGNALS).invoke('text').should('eql', `Showing ${numberOfSignalsToBeClosed.toString()} signal`);
        cy.get(_detections.SIGNALS).should('have.length', numberOfSignalsToBeClosed);
      });
    });
  });
  context('Opening signals', () => {
    beforeEach(() => {
      (0, _es_archiver.esArchiverLoad)('closed_signals');
      (0, _login.loginAndWaitForPage)(_navigation.DETECTIONS);
    });
    it('Open one signal when more than one closed signals are selected', () => {
      (0, _detections2.waitForSignals)();
      (0, _detections2.goToClosedSignals)();
      (0, _detections2.waitForSignalsToBeLoaded)();
      cy.get(_detections.NUMBER_OF_SIGNALS).invoke('text').then(numberOfSignals => {
        const numberOfSignalsToBeOpened = 1;
        const numberOfSignalsToBeSelected = 3;
        cy.get(_detections.OPEN_CLOSE_SIGNALS_BTN).should('have.attr', 'disabled');
        (0, _detections2.selectNumberOfSignals)(numberOfSignalsToBeSelected);
        cy.get(_detections.OPEN_CLOSE_SIGNALS_BTN).should('not.have.attr', 'disabled');
        (0, _detections2.openFirstSignal)();
        cy.reload();
        (0, _detections2.goToClosedSignals)();
        (0, _detections2.waitForSignalsToBeLoaded)();
        (0, _detections2.waitForSignals)();
        const expectedNumberOfSignals = +numberOfSignals - numberOfSignalsToBeOpened;
        cy.get(_detections.NUMBER_OF_SIGNALS).invoke('text').should('eq', expectedNumberOfSignals.toString());
        cy.get(_detections.SHOWING_SIGNALS).invoke('text').should('eql', `Showing ${expectedNumberOfSignals.toString()} signals`);
        (0, _detections2.goToOpenedSignals)();
        (0, _detections2.waitForSignals)();
        cy.get(_detections.NUMBER_OF_SIGNALS).invoke('text').should('eql', numberOfSignalsToBeOpened.toString());
        cy.get(_detections.SHOWING_SIGNALS).invoke('text').should('eql', `Showing ${numberOfSignalsToBeOpened.toString()} signal`);
        cy.get(_detections.SIGNALS).should('have.length', numberOfSignalsToBeOpened);
      });
    });
  });
});