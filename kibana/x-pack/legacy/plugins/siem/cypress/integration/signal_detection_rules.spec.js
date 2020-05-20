"use strict";

var _signal_detection_rules = require("../screens/signal_detection_rules");

var _detections = require("../tasks/detections");

var _es_archiver = require("../tasks/es_archiver");

var _login = require("../tasks/login");

var _signal_detection_rules2 = require("../tasks/signal_detection_rules");

var _navigation = require("../urls/navigation");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
describe('Signal detection rules', () => {
  before(() => {
    (0, _es_archiver.esArchiverLoad)('prebuilt_rules_loaded');
  });
  after(() => {
    (0, _es_archiver.esArchiverUnload)('prebuilt_rules_loaded');
  });
  it('Sorts by activated rules', () => {
    (0, _login.loginAndWaitForPageWithoutDateRange)(_navigation.DETECTIONS);
    (0, _detections.waitForSignalsPanelToBeLoaded)();
    (0, _detections.waitForSignalsIndexToBeCreated)();
    (0, _detections.goToManageSignalDetectionRules)();
    (0, _signal_detection_rules2.waitForLoadElasticPrebuiltDetectionRulesTableToBeLoaded)();
    cy.get(_signal_detection_rules.RULE_NAME).eq(_signal_detection_rules.FIFTH_RULE).invoke('text').then(fifthRuleName => {
      (0, _signal_detection_rules2.activateRule)(_signal_detection_rules.FIFTH_RULE);
      (0, _signal_detection_rules2.waitForRuleToBeActivated)();
      cy.get(_signal_detection_rules.RULE_NAME).eq(_signal_detection_rules.SEVENTH_RULE).invoke('text').then(seventhRuleName => {
        (0, _signal_detection_rules2.activateRule)(_signal_detection_rules.SEVENTH_RULE);
        (0, _signal_detection_rules2.waitForRuleToBeActivated)();
        (0, _signal_detection_rules2.sortByActivatedRules)();
        cy.get(_signal_detection_rules.RULE_NAME).eq(_signal_detection_rules.FIRST_RULE).invoke('text').then(firstRuleName => {
          cy.get(_signal_detection_rules.RULE_NAME).eq(_signal_detection_rules.SECOND_RULE).invoke('text').then(secondRuleName => {
            const expectedRulesNames = `${firstRuleName} ${secondRuleName}`;
            cy.wrap(expectedRulesNames).should('include', fifthRuleName);
            cy.wrap(expectedRulesNames).should('include', seventhRuleName);
          });
        });
        cy.get(_signal_detection_rules.RULE_SWITCH).eq(_signal_detection_rules.FIRST_RULE).should('have.attr', 'role', 'switch');
        cy.get(_signal_detection_rules.RULE_SWITCH).eq(_signal_detection_rules.SECOND_RULE).should('have.attr', 'role', 'switch');
      });
    });
  });
});