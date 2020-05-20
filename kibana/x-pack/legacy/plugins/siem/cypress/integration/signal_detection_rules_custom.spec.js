"use strict";

var _rule = require("../objects/rule");

var _rule_details = require("../screens/rule_details");

var _signal_detection_rules = require("../screens/signal_detection_rules");

var _create_new_rule = require("../tasks/create_new_rule");

var _detections = require("../tasks/detections");

var _signal_detection_rules2 = require("../tasks/signal_detection_rules");

var _es_archiver = require("../tasks/es_archiver");

var _login = require("../tasks/login");

var _navigation = require("../urls/navigation");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
describe('Signal detection rules, custom', () => {
  before(() => {
    (0, _es_archiver.esArchiverLoad)('prebuilt_rules_loaded');
  });
  after(() => {
    (0, _es_archiver.esArchiverUnload)('prebuilt_rules_loaded');
  });
  it('Creates and activates a new custom rule', () => {
    (0, _login.loginAndWaitForPageWithoutDateRange)(_navigation.DETECTIONS);
    (0, _detections.waitForSignalsPanelToBeLoaded)();
    (0, _detections.waitForSignalsIndexToBeCreated)();
    (0, _detections.goToManageSignalDetectionRules)();
    (0, _signal_detection_rules2.waitForLoadElasticPrebuiltDetectionRulesTableToBeLoaded)();
    (0, _signal_detection_rules2.goToCreateNewRule)();
    (0, _create_new_rule.fillDefineCustomRuleAndContinue)(_rule.newRule);
    (0, _create_new_rule.fillAboutRuleAndContinue)(_rule.newRule);
    (0, _create_new_rule.createAndActivateRule)();
    cy.get(_signal_detection_rules.CUSTOM_RULES_BTN).invoke('text').should('eql', 'Custom rules (1)');
    (0, _signal_detection_rules2.changeToThreeHundredRowsPerPage)();
    (0, _signal_detection_rules2.waitForRulesToBeLoaded)();
    const expectedNumberOfRules = _rule.totalNumberOfPrebuiltRules + 1;
    cy.get(_signal_detection_rules.RULES_TABLE).then($table => {
      cy.wrap($table.find(_signal_detection_rules.RULES_ROW).length).should('eql', expectedNumberOfRules);
    });
    (0, _signal_detection_rules2.filterByCustomRules)();
    cy.get(_signal_detection_rules.RULES_TABLE).then($table => {
      cy.wrap($table.find(_signal_detection_rules.RULES_ROW).length).should('eql', 1);
    });
    cy.get(_signal_detection_rules.RULE_NAME).invoke('text').should('eql', _rule.newRule.name);
    cy.get(_signal_detection_rules.RISK_SCORE).invoke('text').should('eql', _rule.newRule.riskScore);
    cy.get(_signal_detection_rules.SEVERITY).invoke('text').should('eql', _rule.newRule.severity);
    cy.get('[data-test-subj="rule-switch"]').should('have.attr', 'aria-checked', 'true');
    (0, _signal_detection_rules2.goToRuleDetails)();
    let expectedUrls = '';

    _rule.newRule.referenceUrls.forEach(url => {
      expectedUrls = expectedUrls + url;
    });

    let expectedFalsePositives = '';

    _rule.newRule.falsePositivesExamples.forEach(falsePositive => {
      expectedFalsePositives = expectedFalsePositives + falsePositive;
    });

    let expectedTags = '';

    _rule.newRule.tags.forEach(tag => {
      expectedTags = expectedTags + tag;
    });

    let expectedMitre = '';

    _rule.newRule.mitre.forEach(mitre => {
      expectedMitre = expectedMitre + mitre.tactic;
      mitre.techniques.forEach(technique => {
        expectedMitre = expectedMitre + technique;
      });
    });

    const expectedIndexPatterns = ['apm-*-transaction*', 'auditbeat-*', 'endgame-*', 'filebeat-*', 'packetbeat-*', 'winlogbeat-*'];
    cy.get(_rule_details.RULE_NAME_HEADER).invoke('text').should('eql', `${_rule.newRule.name} Beta`);
    cy.get(_rule_details.ABOUT_RULE_DESCRIPTION).invoke('text').should('eql', _rule.newRule.description);
    cy.get(_rule_details.ABOUT_STEP).eq(_rule_details.ABOUT_SEVERITY).invoke('text').should('eql', _rule.newRule.severity);
    cy.get(_rule_details.ABOUT_STEP).eq(_rule_details.ABOUT_RISK).invoke('text').should('eql', _rule.newRule.riskScore);
    cy.get(_rule_details.ABOUT_STEP).eq(_rule_details.ABOUT_URLS).invoke('text').should('eql', expectedUrls);
    cy.get(_rule_details.ABOUT_STEP).eq(_rule_details.ABOUT_FALSE_POSITIVES).invoke('text').should('eql', expectedFalsePositives);
    cy.get(_rule_details.ABOUT_STEP).eq(_rule_details.ABOUT_MITRE).invoke('text').should('eql', expectedMitre);
    cy.get(_rule_details.ABOUT_STEP).eq(_rule_details.ABOUT_TAGS).invoke('text').should('eql', expectedTags);
    cy.get(_rule_details.RULE_ABOUT_DETAILS_HEADER_TOGGLE).eq(_rule_details.INVESTIGATION_NOTES_TOGGLE).click({
      force: true
    });
    cy.get(_rule_details.ABOUT_INVESTIGATION_NOTES).invoke('text').should('eql', _rule_details.INVESTIGATION_NOTES_MARKDOWN);
    cy.get(_rule_details.DEFINITION_INDEX_PATTERNS).then(patterns => {
      cy.wrap(patterns).each((pattern, index) => {
        cy.wrap(pattern).invoke('text').should('eql', expectedIndexPatterns[index]);
      });
    });
    cy.get(_rule_details.DEFINITION_STEP).eq(_rule_details.DEFINITION_CUSTOM_QUERY).invoke('text').should('eql', `${_rule.newRule.customQuery} `);
    cy.get(_rule_details.DEFINITION_STEP).eq(_rule_details.DEFINITION_TIMELINE).invoke('text').should('eql', 'Default blank timeline');
    cy.get(_rule_details.SCHEDULE_STEP).eq(_rule_details.SCHEDULE_RUNS).invoke('text').should('eql', '5m');
    cy.get(_rule_details.SCHEDULE_STEP).eq(_rule_details.SCHEDULE_LOOPBACK).invoke('text').should('eql', '1m');
  });
});
describe('Deletes custom rules', () => {
  beforeEach(() => {
    (0, _es_archiver.esArchiverLoad)('custom_rules');
    (0, _login.loginAndWaitForPageWithoutDateRange)(_navigation.DETECTIONS);
    (0, _detections.waitForSignalsPanelToBeLoaded)();
    (0, _detections.waitForSignalsIndexToBeCreated)();
    (0, _detections.goToManageSignalDetectionRules)();
  });
  after(() => {
    (0, _es_archiver.esArchiverUnload)('custom_rules');
  });
  it('Deletes one rule', () => {
    cy.get(_signal_detection_rules.RULES_TABLE).find(_signal_detection_rules.RULES_ROW).then(rules => {
      const initialNumberOfRules = rules.length;
      const expectedNumberOfRulesAfterDeletion = initialNumberOfRules - 1;
      cy.get(_signal_detection_rules.SHOWING_RULES_TEXT).invoke('text').should('eql', `Showing ${initialNumberOfRules} rules`);
      (0, _signal_detection_rules2.deleteFirstRule)();
      (0, _signal_detection_rules2.waitForRulesToBeLoaded)();
      cy.get(_signal_detection_rules.RULES_TABLE).then($table => {
        cy.wrap($table.find(_signal_detection_rules.RULES_ROW).length).should('eql', expectedNumberOfRulesAfterDeletion);
      });
      cy.get(_signal_detection_rules.SHOWING_RULES_TEXT).invoke('text').should('eql', `Showing ${expectedNumberOfRulesAfterDeletion} rules`);
      cy.get(_signal_detection_rules.CUSTOM_RULES_BTN).invoke('text').should('eql', `Custom rules (${expectedNumberOfRulesAfterDeletion})`);
    });
  });
  it('Deletes more than one rule', () => {
    cy.get(_signal_detection_rules.RULES_TABLE).find(_signal_detection_rules.RULES_ROW).then(rules => {
      const initialNumberOfRules = rules.length;
      const numberOfRulesToBeDeleted = 3;
      const expectedNumberOfRulesAfterDeletion = initialNumberOfRules - numberOfRulesToBeDeleted;
      (0, _signal_detection_rules2.selectNumberOfRules)(numberOfRulesToBeDeleted);
      (0, _signal_detection_rules2.deleteSelectedRules)();
      (0, _signal_detection_rules2.waitForRulesToBeLoaded)();
      cy.get(_signal_detection_rules.RULES_TABLE).then($table => {
        cy.wrap($table.find(_signal_detection_rules.RULES_ROW).length).should('eql', expectedNumberOfRulesAfterDeletion);
      });
      cy.get(_signal_detection_rules.SHOWING_RULES_TEXT).invoke('text').should('eql', `Showing ${expectedNumberOfRulesAfterDeletion} rule`);
      cy.get(_signal_detection_rules.CUSTOM_RULES_BTN).invoke('text').should('eql', `Custom rules (${expectedNumberOfRulesAfterDeletion})`);
    });
  });
});