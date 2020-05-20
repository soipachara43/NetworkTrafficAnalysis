"use strict";

var _signal_detection_rules = require("../screens/signal_detection_rules");

var _signal_detection_rules2 = require("../tasks/signal_detection_rules");

var _detections = require("../tasks/detections");

var _es_archiver = require("../tasks/es_archiver");

var _login = require("../tasks/login");

var _navigation = require("../urls/navigation");

var _rule = require("../objects/rule");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
describe('Signal detection rules, prebuilt rules', () => {
  before(() => {
    (0, _es_archiver.esArchiverLoadEmptyKibana)();
  });
  after(() => {
    (0, _es_archiver.esArchiverUnloadEmptyKibana)();
  });
  it('Loads prebuilt rules', () => {
    const expectedNumberOfRules = _rule.totalNumberOfPrebuiltRules;
    const expectedElasticRulesBtnText = `Elastic rules (${expectedNumberOfRules})`;
    (0, _login.loginAndWaitForPageWithoutDateRange)(_navigation.DETECTIONS);
    (0, _detections.waitForSignalsPanelToBeLoaded)();
    (0, _detections.waitForSignalsIndexToBeCreated)();
    (0, _detections.goToManageSignalDetectionRules)();
    (0, _signal_detection_rules2.waitForLoadElasticPrebuiltDetectionRulesTableToBeLoaded)();
    (0, _signal_detection_rules2.loadPrebuiltDetectionRules)();
    (0, _signal_detection_rules2.waitForPrebuiltDetectionRulesToBeLoaded)();
    cy.get(_signal_detection_rules.ELASTIC_RULES_BTN).invoke('text').should('eql', expectedElasticRulesBtnText);
    (0, _signal_detection_rules2.changeToThreeHundredRowsPerPage)();
    (0, _signal_detection_rules2.waitForRulesToBeLoaded)();
    cy.get(_signal_detection_rules.RULES_TABLE).then($table => {
      cy.wrap($table.find(_signal_detection_rules.RULES_ROW).length).should('eql', expectedNumberOfRules);
    });
  });
});
describe('Deleting prebuilt rules', () => {
  beforeEach(() => {
    (0, _es_archiver.esArchiverLoad)('prebuilt_rules_loaded');
    (0, _login.loginAndWaitForPageWithoutDateRange)(_navigation.DETECTIONS);
    (0, _detections.waitForSignalsPanelToBeLoaded)();
    (0, _detections.waitForSignalsIndexToBeCreated)();
    (0, _detections.goToManageSignalDetectionRules)();
  });
  afterEach(() => {
    (0, _es_archiver.esArchiverUnload)('prebuilt_rules_loaded');
  });
  it('Does not allow to delete one rule when more than one is selected', () => {
    const numberOfRulesToBeSelected = 2;
    (0, _signal_detection_rules2.selectNumberOfRules)(numberOfRulesToBeSelected);
    cy.get(_signal_detection_rules.COLLAPSED_ACTION_BTN).each(collapsedItemActionBtn => {
      cy.wrap(collapsedItemActionBtn).should('have.attr', 'disabled');
    });
  });
  it('Deletes and recovers one rule', () => {
    const expectedNumberOfRulesAfterDeletion = _rule.totalNumberOfPrebuiltRules - 1;
    const expectedNumberOfRulesAfterRecovering = _rule.totalNumberOfPrebuiltRules;
    (0, _signal_detection_rules2.deleteFirstRule)();
    cy.reload();
    (0, _signal_detection_rules2.changeToThreeHundredRowsPerPage)();
    (0, _signal_detection_rules2.waitForRulesToBeLoaded)();
    cy.get(_signal_detection_rules.ELASTIC_RULES_BTN).invoke('text').should('eql', `Elastic rules (${expectedNumberOfRulesAfterDeletion})`);
    cy.get(_signal_detection_rules.RULES_TABLE).then($table => {
      cy.wrap($table.find(_signal_detection_rules.RULES_ROW).length).should('eql', expectedNumberOfRulesAfterDeletion);
    });
    cy.get(_signal_detection_rules.RELOAD_PREBUILT_RULES_BTN).should('exist');
    cy.get(_signal_detection_rules.RELOAD_PREBUILT_RULES_BTN).invoke('text').should('eql', 'Install 1 Elastic prebuilt rule ');
    (0, _signal_detection_rules2.reloadDeletedRules)();
    cy.get(_signal_detection_rules.RELOAD_PREBUILT_RULES_BTN).should('not.exist');
    cy.reload();
    (0, _signal_detection_rules2.changeToThreeHundredRowsPerPage)();
    (0, _signal_detection_rules2.waitForRulesToBeLoaded)();
    cy.get(_signal_detection_rules.RULES_TABLE).then($table => {
      cy.wrap($table.find(_signal_detection_rules.RULES_ROW).length).should('eql', expectedNumberOfRulesAfterRecovering);
    });
    cy.get(_signal_detection_rules.ELASTIC_RULES_BTN).invoke('text').should('eql', `Elastic rules (${expectedNumberOfRulesAfterRecovering})`);
  });
  it('Deletes and recovers more than one rule', () => {
    const numberOfRulesToBeSelected = 2;
    const expectedNumberOfRulesAfterDeletion = _rule.totalNumberOfPrebuiltRules - 2;
    const expectedNumberOfRulesAfterRecovering = _rule.totalNumberOfPrebuiltRules;
    (0, _signal_detection_rules2.selectNumberOfRules)(numberOfRulesToBeSelected);
    (0, _signal_detection_rules2.deleteSelectedRules)();
    cy.reload();
    (0, _signal_detection_rules2.changeToThreeHundredRowsPerPage)();
    (0, _signal_detection_rules2.waitForRulesToBeLoaded)();
    cy.get(_signal_detection_rules.RELOAD_PREBUILT_RULES_BTN).should('exist');
    cy.get(_signal_detection_rules.RELOAD_PREBUILT_RULES_BTN).invoke('text').should('eql', `Install ${numberOfRulesToBeSelected} Elastic prebuilt rules `);
    cy.get(_signal_detection_rules.ELASTIC_RULES_BTN).invoke('text').should('eql', `Elastic rules (${expectedNumberOfRulesAfterDeletion})`);
    cy.get(_signal_detection_rules.RULES_TABLE).then($table => {
      cy.wrap($table.find(_signal_detection_rules.RULES_ROW).length).should('eql', expectedNumberOfRulesAfterDeletion);
    });
    (0, _signal_detection_rules2.reloadDeletedRules)();
    cy.get(_signal_detection_rules.RELOAD_PREBUILT_RULES_BTN).should('not.exist');
    cy.reload();
    (0, _signal_detection_rules2.changeToThreeHundredRowsPerPage)();
    (0, _signal_detection_rules2.waitForRulesToBeLoaded)();
    cy.get(_signal_detection_rules.RULES_TABLE).then($table => {
      cy.wrap($table.find(_signal_detection_rules.RULES_ROW).length).should('eql', expectedNumberOfRulesAfterRecovering);
    });
    cy.get(_signal_detection_rules.ELASTIC_RULES_BTN).invoke('text').should('eql', `Elastic rules (${expectedNumberOfRulesAfterRecovering})`);
  });
});