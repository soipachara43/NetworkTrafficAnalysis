"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SHOWING_SIGNALS = exports.VIEW_SIGNALS = exports.ALL_OTHERS = exports.HISTOGRAM_HEADER = exports.STACK_BY_USERS = exports.STACK_BY_RULE_NAMES = exports.STACK_BY_RULE_TYPES = exports.STACK_BY_HOST_NAMES = exports.STACK_BY_CATEGORIES = exports.STACK_BY_ACTIONS = exports.STACK_BY_SOURCE_IPS = exports.STACK_BY_DESTINATION_IPS = exports.STACK_BY_SEVERITIES = exports.STACK_BY_RISK_SCORES = exports.STACK_BY_LABEL = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var STACK_BY_LABEL = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.histogram.stackByOptions.stackByLabel', {
  defaultMessage: 'Stack by'
});

exports.STACK_BY_LABEL = STACK_BY_LABEL;

var STACK_BY_RISK_SCORES = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.histogram.stackByOptions.riskScoresDropDown', {
  defaultMessage: 'Risk scores'
});

exports.STACK_BY_RISK_SCORES = STACK_BY_RISK_SCORES;

var STACK_BY_SEVERITIES = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.histogram.stackByOptions.severitiesDropDown', {
  defaultMessage: 'Severities'
});

exports.STACK_BY_SEVERITIES = STACK_BY_SEVERITIES;

var STACK_BY_DESTINATION_IPS = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.histogram.stackByOptions.destinationIpsDropDown', {
  defaultMessage: 'Top destination IPs'
});

exports.STACK_BY_DESTINATION_IPS = STACK_BY_DESTINATION_IPS;

var STACK_BY_SOURCE_IPS = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.histogram.stackByOptions.sourceIpsDropDown', {
  defaultMessage: 'Top source IPs'
});

exports.STACK_BY_SOURCE_IPS = STACK_BY_SOURCE_IPS;

var STACK_BY_ACTIONS = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.histogram.stackByOptions.eventActionsDropDown', {
  defaultMessage: 'Top event actions'
});

exports.STACK_BY_ACTIONS = STACK_BY_ACTIONS;

var STACK_BY_CATEGORIES = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.histogram.stackByOptions.eventCategoriesDropDown', {
  defaultMessage: 'Top event categories'
});

exports.STACK_BY_CATEGORIES = STACK_BY_CATEGORIES;

var STACK_BY_HOST_NAMES = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.histogram.stackByOptions.hostNamesDropDown', {
  defaultMessage: 'Top host names'
});

exports.STACK_BY_HOST_NAMES = STACK_BY_HOST_NAMES;

var STACK_BY_RULE_TYPES = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.histogram.stackByOptions.ruleTypesDropDown', {
  defaultMessage: 'Top rule types'
});

exports.STACK_BY_RULE_TYPES = STACK_BY_RULE_TYPES;

var STACK_BY_RULE_NAMES = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.histogram.stackByOptions.rulesDropDown', {
  defaultMessage: 'Top rules'
});

exports.STACK_BY_RULE_NAMES = STACK_BY_RULE_NAMES;

var STACK_BY_USERS = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.histogram.stackByOptions.usersDropDown', {
  defaultMessage: 'Top users'
});

exports.STACK_BY_USERS = STACK_BY_USERS;

var HISTOGRAM_HEADER = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.histogram.headerTitle', {
  defaultMessage: 'Signal count'
});

exports.HISTOGRAM_HEADER = HISTOGRAM_HEADER;

var ALL_OTHERS = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.histogram.allOthersGroupingLabel', {
  defaultMessage: 'All others'
});

exports.ALL_OTHERS = ALL_OTHERS;

var VIEW_SIGNALS = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.histogram.viewSignalsButtonLabel', {
  defaultMessage: 'View signals'
});

exports.VIEW_SIGNALS = VIEW_SIGNALS;

var SHOWING_SIGNALS = function SHOWING_SIGNALS(totalSignalsFormatted, totalSignals, modifier) {
  return _i18n.i18n.translate('xpack.siem.detectionEngine.signals.histogram.showingSignalsTitle', {
    values: {
      totalSignalsFormatted: totalSignalsFormatted,
      totalSignals: totalSignals,
      modifier: modifier
    },
    defaultMessage: 'Showing: {modifier}{totalSignalsFormatted} {totalSignals, plural, =1 {signal} other {signals}}'
  });
};

exports.SHOWING_SIGNALS = SHOWING_SIGNALS;