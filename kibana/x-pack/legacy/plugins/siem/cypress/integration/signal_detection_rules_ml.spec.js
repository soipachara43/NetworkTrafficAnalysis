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
describe('Signal detection rules, machine learning', () => {
  before(() => {
    (0, _es_archiver.esArchiverLoad)('prebuilt_rules_loaded');
  });
  after(() => {
    (0, _es_archiver.esArchiverUnload)('prebuilt_rules_loaded');
  });
  it('Creates and activates a new ml rule', () => {
    (0, _login.loginAndWaitForPageWithoutDateRange)(_navigation.DETECTIONS);
    (0, _detections.waitForSignalsPanelToBeLoaded)();
    (0, _detections.waitForSignalsIndexToBeCreated)();
    (0, _detections.goToManageSignalDetectionRules)();
    (0, _signal_detection_rules2.waitForLoadElasticPrebuiltDetectionRulesTableToBeLoaded)();
    (0, _signal_detection_rules2.goToCreateNewRule)();
    (0, _create_new_rule.selectMachineLearningRuleType)();
    (0, _create_new_rule.fillDefineMachineLearningRuleAndContinue)(_rule.machineLearningRule);
    (0, _create_new_rule.fillAboutRuleAndContinue)(_rule.machineLearningRule);
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
    cy.get(_signal_detection_rules.RULE_NAME).invoke('text').should('eql', _rule.machineLearningRule.name);
    cy.get(_signal_detection_rules.RISK_SCORE).invoke('text').should('eql', _rule.machineLearningRule.riskScore);
    cy.get(_signal_detection_rules.SEVERITY).invoke('text').should('eql', _rule.machineLearningRule.severity);
    cy.get(_signal_detection_rules.RULE_SWITCH).should('have.attr', 'aria-checked', 'true');
    (0, _signal_detection_rules2.goToRuleDetails)();
    let expectedUrls = '';

    _rule.machineLearningRule.referenceUrls.forEach(url => {
      expectedUrls = expectedUrls + url;
    });

    let expectedFalsePositives = '';

    _rule.machineLearningRule.falsePositivesExamples.forEach(falsePositive => {
      expectedFalsePositives = expectedFalsePositives + falsePositive;
    });

    let expectedTags = '';

    _rule.machineLearningRule.tags.forEach(tag => {
      expectedTags = expectedTags + tag;
    });

    let expectedMitre = '';

    _rule.machineLearningRule.mitre.forEach(mitre => {
      expectedMitre = expectedMitre + mitre.tactic;
      mitre.techniques.forEach(technique => {
        expectedMitre = expectedMitre + technique;
      });
    });

    cy.get(_rule_details.RULE_NAME_HEADER).invoke('text').should('eql', `${_rule.machineLearningRule.name} Beta`);
    cy.get(_rule_details.ABOUT_RULE_DESCRIPTION).invoke('text').should('eql', _rule.machineLearningRule.description);
    cy.get(_rule_details.ABOUT_STEP).eq(_rule_details.ABOUT_SEVERITY).invoke('text').should('eql', _rule.machineLearningRule.severity);
    cy.get(_rule_details.ABOUT_STEP).eq(_rule_details.ABOUT_RISK).invoke('text').should('eql', _rule.machineLearningRule.riskScore);
    cy.get(_rule_details.ABOUT_STEP).eq(_rule_details.ABOUT_URLS).invoke('text').should('eql', expectedUrls);
    cy.get(_rule_details.ABOUT_STEP).eq(_rule_details.ABOUT_FALSE_POSITIVES).invoke('text').should('eql', expectedFalsePositives);
    cy.get(_rule_details.ABOUT_STEP).eq(_rule_details.ABOUT_MITRE).invoke('text').should('eql', expectedMitre);
    cy.get(_rule_details.ABOUT_STEP).eq(_rule_details.ABOUT_TAGS).invoke('text').should('eql', expectedTags);
    cy.get(_rule_details.DEFINITION_STEP).eq(_rule_details.RULE_TYPE).invoke('text').should('eql', 'Machine Learning');
    cy.get(_rule_details.DEFINITION_STEP).eq(_rule_details.ANOMALY_SCORE).invoke('text').should('eql', _rule.machineLearningRule.anomalyScoreThreshold);
    cy.get(_rule_details.DEFINITION_STEP).get(_rule_details.MACHINE_LEARNING_JOB_STATUS).invoke('text').should('eql', 'Stopped');
    cy.get(_rule_details.DEFINITION_STEP).get(_rule_details.MACHINE_LEARNING_JOB_ID).invoke('text').should('eql', _rule.machineLearningRule.machineLearningJob);
    cy.get(_rule_details.DEFINITION_STEP).eq(_rule_details.DEFINITION_TIMELINE).invoke('text').should('eql', 'Default blank timeline');
    cy.get(_rule_details.SCHEDULE_STEP).eq(_rule_details.SCHEDULE_RUNS).invoke('text').should('eql', '5m');
    cy.get(_rule_details.SCHEDULE_STEP).eq(_rule_details.SCHEDULE_LOOPBACK).invoke('text').should('eql', '1m');
  });
});