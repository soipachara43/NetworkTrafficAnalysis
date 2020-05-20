"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.machineLearningRule = exports.newRule = exports.totalNumberOfPrebuiltRules = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const totalNumberOfPrebuiltRules = 127;
exports.totalNumberOfPrebuiltRules = totalNumberOfPrebuiltRules;
const mitre1 = {
  tactic: 'Discovery (TA0007)',
  techniques: ['Cloud Service Discovery (T1526)', 'File and Directory Discovery (T1083)']
};
const mitre2 = {
  tactic: 'Execution (TA0002)',
  techniques: ['CMSTP (T1191)']
};
const newRule = {
  customQuery: 'hosts.name: *',
  name: 'New Rule Test',
  description: 'The new rule description.',
  severity: 'High',
  riskScore: '17',
  tags: ['test', 'newRule'],
  referenceUrls: ['https://www.google.com/', 'https://elastic.co/'],
  falsePositivesExamples: ['False1', 'False2'],
  mitre: [mitre1, mitre2],
  note: '# test markdown'
};
exports.newRule = newRule;
const machineLearningRule = {
  machineLearningJob: 'linux_anomalous_network_service',
  anomalyScoreThreshold: '20',
  name: 'New ML Rule Test',
  description: 'The new ML rule description.',
  severity: 'Critical',
  riskScore: '70',
  tags: ['ML'],
  referenceUrls: ['https://elastic.co/'],
  falsePositivesExamples: ['False1'],
  mitre: [mitre1],
  note: '# test markdown'
};
exports.machineLearningRule = machineLearningRule;