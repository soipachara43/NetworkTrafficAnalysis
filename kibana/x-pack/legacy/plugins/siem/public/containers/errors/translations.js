"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NETWORK_FAILURE = exports.DATA_FETCH_FAILURE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DATA_FETCH_FAILURE = _i18n.i18n.translate('xpack.siem.containers.errors.dataFetchFailureTitle', {
  defaultMessage: 'Data Fetch Failure'
});

exports.DATA_FETCH_FAILURE = DATA_FETCH_FAILURE;

var NETWORK_FAILURE = _i18n.i18n.translate('xpack.siem.containers.errors.networkFailureTitle', {
  defaultMessage: 'Network Failure'
});

exports.NETWORK_FAILURE = NETWORK_FAILURE;