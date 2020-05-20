"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stepAboutDefaultValue = exports.threatDefault = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var threatDefault = [{
  framework: 'MITRE ATT&CK',
  tactic: {
    id: 'none',
    name: 'none',
    reference: 'none'
  },
  technique: []
}];
exports.threatDefault = threatDefault;
var stepAboutDefaultValue = {
  name: '',
  description: '',
  isNew: true,
  severity: 'low',
  riskScore: 50,
  references: [''],
  falsePositives: [''],
  tags: [],
  threat: threatDefault,
  note: ''
};
exports.stepAboutDefaultValue = stepAboutDefaultValue;