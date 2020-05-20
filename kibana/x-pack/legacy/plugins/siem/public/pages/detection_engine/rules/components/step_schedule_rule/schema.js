"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = void 0;

var _i18n = require("@kbn/i18n");

var _optional_field_label = require("../optional_field_label");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var schema = {
  interval: {
    label: _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepScheduleRule.fieldIntervalLabel', {
      defaultMessage: 'Runs every'
    }),
    helpText: _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepScheduleRule.fieldIntervalHelpText', {
      defaultMessage: 'Rules run periodically and detect signals within the specified time frame.'
    })
  },
  from: {
    label: _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepScheduleRule.fieldAdditionalLookBackLabel', {
      defaultMessage: 'Additional look-back time'
    }),
    labelAppend: _optional_field_label.OptionalFieldLabel,
    helpText: _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepScheduleRule.fieldAdditionalLookBackHelpText', {
      defaultMessage: 'Adds time to the look-back period to prevent missed signals.'
    })
  }
};
exports.schema = schema;