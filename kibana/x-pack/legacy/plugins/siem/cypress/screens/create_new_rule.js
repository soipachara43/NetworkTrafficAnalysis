"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TAGS_INPUT = exports.SEVERITY_DROPDOWN = exports.SCHEDULE_CONTINUE_BUTTON = exports.RULE_NAME_INPUT = exports.RULE_DESCRIPTION_INPUT = exports.RISK_INPUT = exports.REFERENCE_URLS_INPUT = exports.MITRE_TECHNIQUES_INPUT = exports.MITRE_TACTIC_DROPDOWN = exports.MITRE_TACTIC = exports.MACHINE_LEARNING_TYPE = exports.MACHINE_LEARNING_LIST = exports.MACHINE_LEARNING_DROPDOWN = exports.FALSE_POSITIVES_INPUT = exports.INVESTIGATION_NOTES_TEXTAREA = exports.DEFINE_CONTINUE_BUTTON = exports.CUSTOM_QUERY_INPUT = exports.CREATE_AND_ACTIVATE_BTN = exports.ADVANCED_SETTINGS_BTN = exports.MITRE_BTN = exports.ANOMALY_THRESHOLD_INPUT = exports.ADD_REFERENCE_URL_BTN = exports.ADD_FALSE_POSITIVE_BTN = exports.ABOUT_CONTINUE_BTN = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const ABOUT_CONTINUE_BTN = '[data-test-subj="about-continue"]';
exports.ABOUT_CONTINUE_BTN = ABOUT_CONTINUE_BTN;
const ADD_FALSE_POSITIVE_BTN = '[data-test-subj="detectionEngineStepAboutRuleFalsePositives"] .euiButtonEmpty__text';
exports.ADD_FALSE_POSITIVE_BTN = ADD_FALSE_POSITIVE_BTN;
const ADD_REFERENCE_URL_BTN = '[data-test-subj="detectionEngineStepAboutRuleReferenceUrls"] .euiButtonEmpty__text';
exports.ADD_REFERENCE_URL_BTN = ADD_REFERENCE_URL_BTN;
const ANOMALY_THRESHOLD_INPUT = '[data-test-subj="anomalyThresholdSlider"] .euiFieldNumber';
exports.ANOMALY_THRESHOLD_INPUT = ANOMALY_THRESHOLD_INPUT;
const MITRE_BTN = '[data-test-subj="addMitre"]';
exports.MITRE_BTN = MITRE_BTN;
const ADVANCED_SETTINGS_BTN = '[data-test-subj="advancedSettings"] .euiAccordion__button';
exports.ADVANCED_SETTINGS_BTN = ADVANCED_SETTINGS_BTN;
const CREATE_AND_ACTIVATE_BTN = '[data-test-subj="create-activate"]';
exports.CREATE_AND_ACTIVATE_BTN = CREATE_AND_ACTIVATE_BTN;
const CUSTOM_QUERY_INPUT = '[data-test-subj="queryInput"]';
exports.CUSTOM_QUERY_INPUT = CUSTOM_QUERY_INPUT;
const DEFINE_CONTINUE_BUTTON = '[data-test-subj="define-continue"]';
exports.DEFINE_CONTINUE_BUTTON = DEFINE_CONTINUE_BUTTON;
const INVESTIGATION_NOTES_TEXTAREA = '[data-test-subj="detectionEngineStepAboutRuleNote"] textarea';
exports.INVESTIGATION_NOTES_TEXTAREA = INVESTIGATION_NOTES_TEXTAREA;
const FALSE_POSITIVES_INPUT = '[data-test-subj="detectionEngineStepAboutRuleFalsePositives"] input';
exports.FALSE_POSITIVES_INPUT = FALSE_POSITIVES_INPUT;
const MACHINE_LEARNING_DROPDOWN = '[data-test-subj="mlJobSelect"] button';
exports.MACHINE_LEARNING_DROPDOWN = MACHINE_LEARNING_DROPDOWN;
const MACHINE_LEARNING_LIST = '.euiContextMenuItem__text';
exports.MACHINE_LEARNING_LIST = MACHINE_LEARNING_LIST;
const MACHINE_LEARNING_TYPE = '[data-test-subj="machineLearningRuleType"]';
exports.MACHINE_LEARNING_TYPE = MACHINE_LEARNING_TYPE;
const MITRE_TACTIC = '.euiContextMenuItem__text';
exports.MITRE_TACTIC = MITRE_TACTIC;
const MITRE_TACTIC_DROPDOWN = '[data-test-subj="mitreTactic"]';
exports.MITRE_TACTIC_DROPDOWN = MITRE_TACTIC_DROPDOWN;
const MITRE_TECHNIQUES_INPUT = '[data-test-subj="mitreTechniques"] [data-test-subj="comboBoxSearchInput"]';
exports.MITRE_TECHNIQUES_INPUT = MITRE_TECHNIQUES_INPUT;
const REFERENCE_URLS_INPUT = '[data-test-subj="detectionEngineStepAboutRuleReferenceUrls"] input';
exports.REFERENCE_URLS_INPUT = REFERENCE_URLS_INPUT;
const RISK_INPUT = '.euiRangeInput';
exports.RISK_INPUT = RISK_INPUT;
const RULE_DESCRIPTION_INPUT = '[data-test-subj="detectionEngineStepAboutRuleDescription"] [data-test-subj="input"]';
exports.RULE_DESCRIPTION_INPUT = RULE_DESCRIPTION_INPUT;
const RULE_NAME_INPUT = '[data-test-subj="detectionEngineStepAboutRuleName"] [data-test-subj="input"]';
exports.RULE_NAME_INPUT = RULE_NAME_INPUT;
const SCHEDULE_CONTINUE_BUTTON = '[data-test-subj="schedule-continue"]';
exports.SCHEDULE_CONTINUE_BUTTON = SCHEDULE_CONTINUE_BUTTON;
const SEVERITY_DROPDOWN = '[data-test-subj="detectionEngineStepAboutRuleSeverity"] [data-test-subj="select"]';
exports.SEVERITY_DROPDOWN = SEVERITY_DROPDOWN;
const TAGS_INPUT = '[data-test-subj="detectionEngineStepAboutRuleTags"] [data-test-subj="comboBoxSearchInput"]';
exports.TAGS_INPUT = TAGS_INPUT;