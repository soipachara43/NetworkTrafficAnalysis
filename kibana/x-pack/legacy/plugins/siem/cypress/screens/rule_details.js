"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SCHEDULE_LOOPBACK = exports.SCHEDULE_RUNS = exports.SCHEDULE_STEP = exports.RULE_TYPE = exports.RULE_NAME_HEADER = exports.RULE_ABOUT_DETAILS_HEADER_TOGGLE = exports.MACHINE_LEARNING_JOB_STATUS = exports.MACHINE_LEARNING_JOB_ID = exports.INVESTIGATION_NOTES_TOGGLE = exports.INVESTIGATION_NOTES_MARKDOWN = exports.DEFINITION_STEP = exports.DEFINITION_INDEX_PATTERNS = exports.DEFINITION_TIMELINE = exports.DEFINITION_CUSTOM_QUERY = exports.ANOMALY_SCORE = exports.ABOUT_URLS = exports.ABOUT_TAGS = exports.ABOUT_STEP = exports.ABOUT_SEVERITY = exports.ABOUT_RISK = exports.ABOUT_RULE_DESCRIPTION = exports.ABOUT_MITRE = exports.ABOUT_INVESTIGATION_NOTES = exports.ABOUT_FALSE_POSITIVES = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const ABOUT_FALSE_POSITIVES = 3;
exports.ABOUT_FALSE_POSITIVES = ABOUT_FALSE_POSITIVES;
const ABOUT_INVESTIGATION_NOTES = '[data-test-subj="stepAboutDetailsNoteContent"]';
exports.ABOUT_INVESTIGATION_NOTES = ABOUT_INVESTIGATION_NOTES;
const ABOUT_MITRE = 4;
exports.ABOUT_MITRE = ABOUT_MITRE;
const ABOUT_RULE_DESCRIPTION = '[data-test-subj=stepAboutRuleDetailsToggleDescriptionText]';
exports.ABOUT_RULE_DESCRIPTION = ABOUT_RULE_DESCRIPTION;
const ABOUT_RISK = 1;
exports.ABOUT_RISK = ABOUT_RISK;
const ABOUT_SEVERITY = 0;
exports.ABOUT_SEVERITY = ABOUT_SEVERITY;
const ABOUT_STEP = '[data-test-subj="aboutRule"] .euiDescriptionList__description';
exports.ABOUT_STEP = ABOUT_STEP;
const ABOUT_TAGS = 5;
exports.ABOUT_TAGS = ABOUT_TAGS;
const ABOUT_URLS = 2;
exports.ABOUT_URLS = ABOUT_URLS;
const ANOMALY_SCORE = 1;
exports.ANOMALY_SCORE = ANOMALY_SCORE;
const DEFINITION_CUSTOM_QUERY = 1;
exports.DEFINITION_CUSTOM_QUERY = DEFINITION_CUSTOM_QUERY;
const DEFINITION_TIMELINE = 3;
exports.DEFINITION_TIMELINE = DEFINITION_TIMELINE;
const DEFINITION_INDEX_PATTERNS = '[data-test-subj=definitionRule] [data-test-subj="listItemColumnStepRuleDescription"] .euiDescriptionList__description .euiBadge__text';
exports.DEFINITION_INDEX_PATTERNS = DEFINITION_INDEX_PATTERNS;
const DEFINITION_STEP = '[data-test-subj=definitionRule] [data-test-subj="listItemColumnStepRuleDescription"] .euiDescriptionList__description';
exports.DEFINITION_STEP = DEFINITION_STEP;
const INVESTIGATION_NOTES_MARKDOWN = 'test markdown';
exports.INVESTIGATION_NOTES_MARKDOWN = INVESTIGATION_NOTES_MARKDOWN;
const INVESTIGATION_NOTES_TOGGLE = 1;
exports.INVESTIGATION_NOTES_TOGGLE = INVESTIGATION_NOTES_TOGGLE;
const MACHINE_LEARNING_JOB_ID = '[data-test-subj="machineLearningJobId"]';
exports.MACHINE_LEARNING_JOB_ID = MACHINE_LEARNING_JOB_ID;
const MACHINE_LEARNING_JOB_STATUS = '[data-test-subj="machineLearningJobStatus"  ]';
exports.MACHINE_LEARNING_JOB_STATUS = MACHINE_LEARNING_JOB_STATUS;
const RULE_ABOUT_DETAILS_HEADER_TOGGLE = '[data-test-subj="stepAboutDetailsToggle"]';
exports.RULE_ABOUT_DETAILS_HEADER_TOGGLE = RULE_ABOUT_DETAILS_HEADER_TOGGLE;
const RULE_NAME_HEADER = '[data-test-subj="header-page-title"]';
exports.RULE_NAME_HEADER = RULE_NAME_HEADER;
const RULE_TYPE = 0;
exports.RULE_TYPE = RULE_TYPE;
const SCHEDULE_STEP = '[data-test-subj="schedule"]  .euiDescriptionList__description';
exports.SCHEDULE_STEP = SCHEDULE_STEP;
const SCHEDULE_RUNS = 0;
exports.SCHEDULE_RUNS = SCHEDULE_RUNS;
const SCHEDULE_LOOPBACK = 1;
exports.SCHEDULE_LOOPBACK = SCHEDULE_LOOPBACK;