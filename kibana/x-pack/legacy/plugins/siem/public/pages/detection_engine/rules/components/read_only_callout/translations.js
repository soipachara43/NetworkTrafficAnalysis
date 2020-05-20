"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DISMISS_CALLOUT = exports.READ_ONLY_CALLOUT_MSG = exports.READ_ONLY_CALLOUT_TITLE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var READ_ONLY_CALLOUT_TITLE = _i18n.i18n.translate('xpack.siem.detectionEngine.readOnlyCallOutTitle', {
  defaultMessage: 'Rule permissions required'
});

exports.READ_ONLY_CALLOUT_TITLE = READ_ONLY_CALLOUT_TITLE;

var READ_ONLY_CALLOUT_MSG = _i18n.i18n.translate('xpack.siem.detectionEngine.readOnlyCallOutMsg', {
  defaultMessage: 'You are currently missing the required permissions to create/edit detection engine rule. Please contact your administrator for further assistance.'
});

exports.READ_ONLY_CALLOUT_MSG = READ_ONLY_CALLOUT_MSG;

var DISMISS_CALLOUT = _i18n.i18n.translate('xpack.siem.detectionEngine.dismissButton', {
  defaultMessage: 'Dismiss'
});

exports.DISMISS_CALLOUT = DISMISS_CALLOUT;