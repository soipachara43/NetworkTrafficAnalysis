"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REFRESH = exports.STATUS_DATE = exports.STATUS_AT = exports.STATUS = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var STATUS = _i18n.i18n.translate('xpack.siem.detectionEngine.ruleStatus.statusDescription', {
  defaultMessage: 'Last response'
});

exports.STATUS = STATUS;

var STATUS_AT = _i18n.i18n.translate('xpack.siem.detectionEngine.ruleStatus.statusAtDescription', {
  defaultMessage: 'at'
});

exports.STATUS_AT = STATUS_AT;

var STATUS_DATE = _i18n.i18n.translate('xpack.siem.detectionEngine.ruleStatus.statusDateDescription', {
  defaultMessage: 'Status date'
});

exports.STATUS_DATE = STATUS_DATE;

var REFRESH = _i18n.i18n.translate('xpack.siem.detectionEngine.ruleStatus.refreshButton', {
  defaultMessage: 'Refresh'
});

exports.REFRESH = REFRESH;