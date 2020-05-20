"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectMachineLearningRuleType = exports.fillDefineMachineLearningRuleAndContinue = exports.fillDefineCustomRuleAndContinue = exports.fillAboutRuleAndContinue = exports.createAndActivateRule = void 0;

var _rule = require("../objects/rule");

var _create_new_rule = require("../screens/create_new_rule");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createAndActivateRule = () => {
  cy.get(_create_new_rule.SCHEDULE_CONTINUE_BUTTON).click({
    force: true
  });
  cy.get(_create_new_rule.CREATE_AND_ACTIVATE_BTN).click({
    force: true
  });
  cy.get(_create_new_rule.CREATE_AND_ACTIVATE_BTN).should('not.exist');
};

exports.createAndActivateRule = createAndActivateRule;

const fillAboutRuleAndContinue = rule => {
  cy.get(_create_new_rule.RULE_NAME_INPUT).type(rule.name, {
    force: true
  });
  cy.get(_create_new_rule.RULE_DESCRIPTION_INPUT).type(rule.description, {
    force: true
  });
  cy.get(_create_new_rule.SEVERITY_DROPDOWN).click({
    force: true
  });
  cy.get(`#${rule.severity.toLowerCase()}`).click();
  cy.get(_create_new_rule.RISK_INPUT).clear({
    force: true
  }).type(`${rule.riskScore}`, {
    force: true
  });
  rule.tags.forEach(tag => {
    cy.get(_create_new_rule.TAGS_INPUT).type(`${tag}{enter}`, {
      force: true
    });
  });
  cy.get(_create_new_rule.ADVANCED_SETTINGS_BTN).click({
    force: true
  });
  rule.referenceUrls.forEach((url, index) => {
    cy.get(_create_new_rule.REFERENCE_URLS_INPUT).eq(index).type(url, {
      force: true
    });
    cy.get(_create_new_rule.ADD_REFERENCE_URL_BTN).click({
      force: true
    });
  });
  rule.falsePositivesExamples.forEach((falsePositive, index) => {
    cy.get(_create_new_rule.FALSE_POSITIVES_INPUT).eq(index).type(falsePositive, {
      force: true
    });
    cy.get(_create_new_rule.ADD_FALSE_POSITIVE_BTN).click({
      force: true
    });
  });
  rule.mitre.forEach((mitre, index) => {
    cy.get(_create_new_rule.MITRE_TACTIC_DROPDOWN).eq(index).click({
      force: true
    });
    cy.contains(_create_new_rule.MITRE_TACTIC, mitre.tactic).click();
    mitre.techniques.forEach(technique => {
      cy.get(_create_new_rule.MITRE_TECHNIQUES_INPUT).eq(index).type(`${technique}{enter}`, {
        force: true
      });
    });
    cy.get(_create_new_rule.MITRE_BTN).click({
      force: true
    });
  });
  cy.get(_create_new_rule.INVESTIGATION_NOTES_TEXTAREA).type(rule.note, {
    force: true
  });
  cy.get(_create_new_rule.ABOUT_CONTINUE_BTN).should('exist').click({
    force: true
  });
};

exports.fillAboutRuleAndContinue = fillAboutRuleAndContinue;

const fillDefineCustomRuleAndContinue = rule => {
  cy.get(_create_new_rule.CUSTOM_QUERY_INPUT).type(rule.customQuery);
  cy.get(_create_new_rule.CUSTOM_QUERY_INPUT).should('have.attr', 'value', rule.customQuery);
  cy.get(_create_new_rule.DEFINE_CONTINUE_BUTTON).should('exist').click({
    force: true
  });
  cy.get(_create_new_rule.CUSTOM_QUERY_INPUT).should('not.exist');
};

exports.fillDefineCustomRuleAndContinue = fillDefineCustomRuleAndContinue;

const fillDefineMachineLearningRuleAndContinue = rule => {
  cy.get(_create_new_rule.MACHINE_LEARNING_DROPDOWN).click({
    force: true
  });
  cy.contains(_create_new_rule.MACHINE_LEARNING_LIST, rule.machineLearningJob).click();
  cy.get(_create_new_rule.ANOMALY_THRESHOLD_INPUT).type(`{selectall}${_rule.machineLearningRule.anomalyScoreThreshold}`, {
    force: true
  });
  cy.get(_create_new_rule.DEFINE_CONTINUE_BUTTON).should('exist').click({
    force: true
  });
  cy.get(_create_new_rule.MACHINE_LEARNING_DROPDOWN).should('not.exist');
};

exports.fillDefineMachineLearningRuleAndContinue = fillDefineMachineLearningRuleAndContinue;

const selectMachineLearningRuleType = () => {
  cy.get(_create_new_rule.MACHINE_LEARNING_TYPE).click({
    force: true
  });
};

exports.selectMachineLearningRuleType = selectMachineLearningRuleType;