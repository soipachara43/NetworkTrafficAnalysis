"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.COMPLETE_WITH_ACTIVATING = exports.COMPLETE_WITHOUT_ACTIVATING = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var COMPLETE_WITHOUT_ACTIVATING = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule. stepScheduleRule.completeWithoutActivatingTitle', {
  defaultMessage: 'Create rule without activating it'
});

exports.COMPLETE_WITHOUT_ACTIVATING = COMPLETE_WITHOUT_ACTIVATING;

var COMPLETE_WITH_ACTIVATING = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule. stepScheduleRule.completeWithActivatingTitle', {
  defaultMessage: 'Create & activate rule'
});

exports.COMPLETE_WITH_ACTIVATING = COMPLETE_WITH_ACTIVATING;