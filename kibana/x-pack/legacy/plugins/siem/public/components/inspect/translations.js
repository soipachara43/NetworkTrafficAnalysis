"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REQUEST_TIMESTAMP_DESC = exports.REQUEST_TIMESTAMP = exports.QUERY_TIME_DESC = exports.QUERY_TIME = exports.INDEX_PATTERN_DESC = exports.INDEX_PATTERN = exports.SOMETHING_WENT_WRONG = exports.CLOSE = exports.INSPECT = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var INSPECT = _i18n.i18n.translate('xpack.siem.inspectDescription', {
  defaultMessage: 'Inspect'
});

exports.INSPECT = INSPECT;

var CLOSE = _i18n.i18n.translate('xpack.siem.inspect.modal.closeTitle', {
  defaultMessage: 'Close'
});

exports.CLOSE = CLOSE;

var SOMETHING_WENT_WRONG = _i18n.i18n.translate('xpack.siem.inspect.modal.somethingWentWrongDescription', {
  defaultMessage: 'Sorry about that, something went wrong.'
});

exports.SOMETHING_WENT_WRONG = SOMETHING_WENT_WRONG;

var INDEX_PATTERN = _i18n.i18n.translate('xpack.siem.inspect.modal.indexPatternLabel', {
  defaultMessage: 'Index pattern'
});

exports.INDEX_PATTERN = INDEX_PATTERN;

var INDEX_PATTERN_DESC = _i18n.i18n.translate('xpack.siem.inspect.modal.indexPatternDescription', {
  defaultMessage: 'The index pattern that connected to the Elasticsearch indices. These indices can be configured in Kibana > Advanced Settings.'
});

exports.INDEX_PATTERN_DESC = INDEX_PATTERN_DESC;

var QUERY_TIME = _i18n.i18n.translate('xpack.siem.inspect.modal.queryTimeLabel', {
  defaultMessage: 'Query time'
});

exports.QUERY_TIME = QUERY_TIME;

var QUERY_TIME_DESC = _i18n.i18n.translate('xpack.siem.inspect.modal.queryTimeDescription', {
  defaultMessage: 'The time it took to process the query. Does not include the time to send the request or parse it in the browser.'
});

exports.QUERY_TIME_DESC = QUERY_TIME_DESC;

var REQUEST_TIMESTAMP = _i18n.i18n.translate('xpack.siem.inspect.modal.reqTimestampLabel', {
  defaultMessage: 'Request timestamp'
});

exports.REQUEST_TIMESTAMP = REQUEST_TIMESTAMP;

var REQUEST_TIMESTAMP_DESC = _i18n.i18n.translate('xpack.siem.inspect.modal.reqTimestampDescription', {
  defaultMessage: 'Time when the start of the request has been logged'
});

exports.REQUEST_TIMESTAMP_DESC = REQUEST_TIMESTAMP_DESC;