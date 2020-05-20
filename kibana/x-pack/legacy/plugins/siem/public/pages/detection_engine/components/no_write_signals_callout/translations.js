"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DISMISS_CALLOUT = exports.NO_WRITE_SIGNALS_CALLOUT_MSG = exports.NO_WRITE_SIGNALS_CALLOUT_TITLE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NO_WRITE_SIGNALS_CALLOUT_TITLE = _i18n.i18n.translate('xpack.siem.detectionEngine.noWriteSignalsCallOutTitle', {
  defaultMessage: 'Signals index permissions required'
});

exports.NO_WRITE_SIGNALS_CALLOUT_TITLE = NO_WRITE_SIGNALS_CALLOUT_TITLE;

var NO_WRITE_SIGNALS_CALLOUT_MSG = _i18n.i18n.translate('xpack.siem.detectionEngine.noWriteSignalsCallOutMsg', {
  defaultMessage: 'You are currently missing the required permissions to update signals. Please contact your administrator for further assistance.'
});

exports.NO_WRITE_SIGNALS_CALLOUT_MSG = NO_WRITE_SIGNALS_CALLOUT_MSG;

var DISMISS_CALLOUT = _i18n.i18n.translate('xpack.siem.detectionEngine.dismissNoWriteSignalButton', {
  defaultMessage: 'Dismiss'
});

exports.DISMISS_CALLOUT = DISMISS_CALLOUT;