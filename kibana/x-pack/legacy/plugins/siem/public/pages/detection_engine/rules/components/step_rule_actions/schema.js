"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var schema = {
  actions: {},
  enabled: {},
  kibanaSiemAppUrl: {},
  throttle: {
    label: _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepRuleActions.fieldThrottleLabel', {
      defaultMessage: 'Actions frequency'
    }),
    helpText: _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepRuleActions.fieldThrottleHelpText', {
      defaultMessage: 'Select when automated actions should be performed if a rule evaluates as true.'
    })
  }
};
exports.schema = schema;