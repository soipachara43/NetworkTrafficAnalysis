"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INDEX_PATTERN_FETCH_FAILURE = exports.NETWORK_ERROR = exports.STATUS_CODE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var STATUS_CODE = _i18n.i18n.translate('xpack.siem.components.ml.api.errors.statusCodeFailureTitle', {
  defaultMessage: 'Status Code:'
});

exports.STATUS_CODE = STATUS_CODE;

var NETWORK_ERROR = _i18n.i18n.translate('xpack.siem.components.ml.api.errors.networkErrorFailureTitle', {
  defaultMessage: 'Network Error:'
});

exports.NETWORK_ERROR = NETWORK_ERROR;

var INDEX_PATTERN_FETCH_FAILURE = _i18n.i18n.translate('xpack.siem.components.mlPopup.hooks.errors.indexPatternFetchFailureTitle', {
  defaultMessage: 'Index pattern fetch failure'
});

exports.INDEX_PATTERN_FETCH_FAILURE = INDEX_PATTERN_FETCH_FAILURE;