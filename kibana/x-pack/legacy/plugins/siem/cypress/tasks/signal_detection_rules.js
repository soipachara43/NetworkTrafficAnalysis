"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitForRulesToBeLoaded = exports.waitForRuleToBeActivated = exports.waitForPrebuiltDetectionRulesToBeLoaded = exports.waitForLoadElasticPrebuiltDetectionRulesTableToBeLoaded = exports.sortByActivatedRules = exports.selectNumberOfRules = exports.reloadDeletedRules = exports.loadPrebuiltDetectionRules = exports.goToRuleDetails = exports.goToCreateNewRule = exports.filterByCustomRules = exports.deleteSelectedRules = exports.deleteFirstRule = exports.changeToThreeHundredRowsPerPage = exports.activateRule = void 0;

var _signal_detection_rules = require("../screens/signal_detection_rules");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const activateRule = rulePosition => {
  cy.get(_signal_detection_rules.RULE_SWITCH).eq(rulePosition).click({
    force: true
  });
};

exports.activateRule = activateRule;

const changeToThreeHundredRowsPerPage = () => {
  cy.get(_signal_detection_rules.PAGINATION_POPOVER_BTN).click({
    force: true
  });
  cy.get(_signal_detection_rules.THREE_HUNDRED_ROWS).click();
};

exports.changeToThreeHundredRowsPerPage = changeToThreeHundredRowsPerPage;

const deleteFirstRule = () => {
  cy.get(_signal_detection_rules.COLLAPSED_ACTION_BTN).first().click({
    force: true
  });
  cy.get(_signal_detection_rules.DELETE_RULE_ACTION_BTN).click();
};

exports.deleteFirstRule = deleteFirstRule;

const deleteSelectedRules = () => {
  cy.get(_signal_detection_rules.BULK_ACTIONS_BTN).click({
    force: true
  });
  cy.get(_signal_detection_rules.DELETE_RULE_BULK_BTN).click();
};

exports.deleteSelectedRules = deleteSelectedRules;

const filterByCustomRules = () => {
  cy.get(_signal_detection_rules.CUSTOM_RULES_BTN).click({
    force: true
  });
  cy.get(_signal_detection_rules.LOADING_SPINNER).should('exist');
  cy.get(_signal_detection_rules.LOADING_SPINNER).should('not.exist');
};

exports.filterByCustomRules = filterByCustomRules;

const goToCreateNewRule = () => {
  cy.get(_signal_detection_rules.CREATE_NEW_RULE_BTN).click({
    force: true
  });
};

exports.goToCreateNewRule = goToCreateNewRule;

const goToRuleDetails = () => {
  cy.get(_signal_detection_rules.RULE_NAME).click({
    force: true
  });
};

exports.goToRuleDetails = goToRuleDetails;

const loadPrebuiltDetectionRules = () => {
  cy.get(_signal_detection_rules.LOAD_PREBUILT_RULES_BTN).should('exist').click({
    force: true
  });
};

exports.loadPrebuiltDetectionRules = loadPrebuiltDetectionRules;

const reloadDeletedRules = () => {
  cy.get(_signal_detection_rules.RELOAD_PREBUILT_RULES_BTN).click({
    force: true
  });
};

exports.reloadDeletedRules = reloadDeletedRules;

const selectNumberOfRules = numberOfRules => {
  for (let i = 0; i < numberOfRules; i++) {
    cy.get(_signal_detection_rules.RULE_CHECKBOX).eq(i).click({
      force: true
    });
  }
};

exports.selectNumberOfRules = selectNumberOfRules;

const sortByActivatedRules = () => {
  cy.get(_signal_detection_rules.SORT_RULES_BTN).click({
    force: true
  });
  waitForRulesToBeLoaded();
  cy.get(_signal_detection_rules.SORT_RULES_BTN).click({
    force: true
  });
  waitForRulesToBeLoaded();
};

exports.sortByActivatedRules = sortByActivatedRules;

const waitForLoadElasticPrebuiltDetectionRulesTableToBeLoaded = () => {
  cy.get(_signal_detection_rules.LOADING_INITIAL_PREBUILT_RULES_TABLE).should('exist');
  cy.get(_signal_detection_rules.LOADING_INITIAL_PREBUILT_RULES_TABLE).should('not.exist');
};

exports.waitForLoadElasticPrebuiltDetectionRulesTableToBeLoaded = waitForLoadElasticPrebuiltDetectionRulesTableToBeLoaded;

const waitForPrebuiltDetectionRulesToBeLoaded = () => {
  cy.get(_signal_detection_rules.LOAD_PREBUILT_RULES_BTN).should('not.exist');
  cy.get(_signal_detection_rules.RULES_TABLE).should('exist');
};

exports.waitForPrebuiltDetectionRulesToBeLoaded = waitForPrebuiltDetectionRulesToBeLoaded;

const waitForRuleToBeActivated = () => {
  cy.get(_signal_detection_rules.RULE_SWITCH_LOADER).should('exist');
  cy.get(_signal_detection_rules.RULE_SWITCH_LOADER).should('not.exist');
};

exports.waitForRuleToBeActivated = waitForRuleToBeActivated;

const waitForRulesToBeLoaded = () => {
  cy.get(_signal_detection_rules.LOADING_SPINNER).should('exist');
  cy.get(_signal_detection_rules.LOADING_SPINNER).should('not.exist');
};

exports.waitForRulesToBeLoaded = waitForRulesToBeLoaded;