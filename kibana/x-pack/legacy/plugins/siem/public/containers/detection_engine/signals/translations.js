"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SIGNAL_POST_FAILURE = exports.SIGNAL_GET_NAME_FAILURE = exports.PRIVILEGE_FETCH_FAILURE = exports.SIGNAL_FETCH_FAILURE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SIGNAL_FETCH_FAILURE = _i18n.i18n.translate('xpack.siem.containers.detectionEngine.signals.errorFetchingSignalsDescription', {
  defaultMessage: 'Failed to query signals'
});

exports.SIGNAL_FETCH_FAILURE = SIGNAL_FETCH_FAILURE;

var PRIVILEGE_FETCH_FAILURE = _i18n.i18n.translate('xpack.siem.containers.detectionEngine.signals.errorFetchingSignalsDescription', {
  defaultMessage: 'Failed to query signals'
});

exports.PRIVILEGE_FETCH_FAILURE = PRIVILEGE_FETCH_FAILURE;

var SIGNAL_GET_NAME_FAILURE = _i18n.i18n.translate('xpack.siem.containers.detectionEngine.signals.errorGetSignalDescription', {
  defaultMessage: 'Failed to get signal index name'
});

exports.SIGNAL_GET_NAME_FAILURE = SIGNAL_GET_NAME_FAILURE;

var SIGNAL_POST_FAILURE = _i18n.i18n.translate('xpack.siem.containers.detectionEngine.signals.errorPostSignalDescription', {
  defaultMessage: 'Failed to create signal index'
});

exports.SIGNAL_POST_FAILURE = SIGNAL_POST_FAILURE;