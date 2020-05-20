"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ACTION_INVESTIGATE_IN_TIMELINE = exports.ACTION_CLOSE_SIGNAL = exports.ACTION_OPEN_SIGNAL = exports.SIGNALS_HEADERS_RISK_SCORE = exports.SIGNALS_HEADERS_SEVERITY = exports.SIGNALS_HEADERS_METHOD = exports.SIGNALS_HEADERS_VERSION = exports.SIGNALS_HEADERS_RULE = exports.TOTAL_COUNT_OF_SIGNALS = exports.LOADING_SIGNALS = exports.CLOSED_SIGNALS = exports.OPEN_SIGNALS = exports.SIGNALS_DOCUMENT_TYPE = exports.SIGNALS_TABLE_TITLE = exports.PAGE_TITLE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PAGE_TITLE = _i18n.i18n.translate('xpack.siem.detectionEngine.pageTitle', {
  defaultMessage: 'Detection engine'
});

exports.PAGE_TITLE = PAGE_TITLE;

var SIGNALS_TABLE_TITLE = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.tableTitle', {
  defaultMessage: 'Signals'
});

exports.SIGNALS_TABLE_TITLE = SIGNALS_TABLE_TITLE;

var SIGNALS_DOCUMENT_TYPE = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.documentTypeTitle', {
  defaultMessage: 'Signals'
});

exports.SIGNALS_DOCUMENT_TYPE = SIGNALS_DOCUMENT_TYPE;

var OPEN_SIGNALS = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.openSignalsTitle', {
  defaultMessage: 'Open signals'
});

exports.OPEN_SIGNALS = OPEN_SIGNALS;

var CLOSED_SIGNALS = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.closedSignalsTitle', {
  defaultMessage: 'Closed signals'
});

exports.CLOSED_SIGNALS = CLOSED_SIGNALS;

var LOADING_SIGNALS = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.loadingSignalsTitle', {
  defaultMessage: 'Loading Signals'
});

exports.LOADING_SIGNALS = LOADING_SIGNALS;

var TOTAL_COUNT_OF_SIGNALS = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.totalCountOfSignalsTitle', {
  defaultMessage: 'signals match the search criteria'
});

exports.TOTAL_COUNT_OF_SIGNALS = TOTAL_COUNT_OF_SIGNALS;

var SIGNALS_HEADERS_RULE = _i18n.i18n.translate('xpack.siem.eventsViewer.signals.defaultHeaders.ruleTitle', {
  defaultMessage: 'Rule'
});

exports.SIGNALS_HEADERS_RULE = SIGNALS_HEADERS_RULE;

var SIGNALS_HEADERS_VERSION = _i18n.i18n.translate('xpack.siem.eventsViewer.signals.defaultHeaders.versionTitle', {
  defaultMessage: 'Version'
});

exports.SIGNALS_HEADERS_VERSION = SIGNALS_HEADERS_VERSION;

var SIGNALS_HEADERS_METHOD = _i18n.i18n.translate('xpack.siem.eventsViewer.signals.defaultHeaders.methodTitle', {
  defaultMessage: 'Method'
});

exports.SIGNALS_HEADERS_METHOD = SIGNALS_HEADERS_METHOD;

var SIGNALS_HEADERS_SEVERITY = _i18n.i18n.translate('xpack.siem.eventsViewer.signals.defaultHeaders.severityTitle', {
  defaultMessage: 'Severity'
});

exports.SIGNALS_HEADERS_SEVERITY = SIGNALS_HEADERS_SEVERITY;

var SIGNALS_HEADERS_RISK_SCORE = _i18n.i18n.translate('xpack.siem.eventsViewer.signals.defaultHeaders.riskScoreTitle', {
  defaultMessage: 'Risk Score'
});

exports.SIGNALS_HEADERS_RISK_SCORE = SIGNALS_HEADERS_RISK_SCORE;

var ACTION_OPEN_SIGNAL = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.actions.openSignalTitle', {
  defaultMessage: 'Open signal'
});

exports.ACTION_OPEN_SIGNAL = ACTION_OPEN_SIGNAL;

var ACTION_CLOSE_SIGNAL = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.actions.closeSignalTitle', {
  defaultMessage: 'Close signal'
});

exports.ACTION_CLOSE_SIGNAL = ACTION_CLOSE_SIGNAL;

var ACTION_INVESTIGATE_IN_TIMELINE = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.actions.investigateInTimelineTitle', {
  defaultMessage: 'Investigate in timeline'
});

exports.ACTION_INVESTIGATE_IN_TIMELINE = ACTION_INVESTIGATE_IN_TIMELINE;