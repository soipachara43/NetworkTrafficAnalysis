"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BATCH_ACTION_CLOSE_SELECTED = exports.BATCH_ACTION_OPEN_SELECTED = exports.BATCH_ACTION_VIEW_SELECTED_IN_TIMELINE = exports.BATCH_ACTION_VIEW_SELECTED_IN_NETWORK = exports.BATCH_ACTION_VIEW_SELECTED_IN_HOSTS = exports.BATCH_ACTIONS = exports.CLEAR_SELECTION = exports.SELECT_ALL_SIGNALS = exports.SELECTED_SIGNALS = exports.SHOWING_SIGNALS = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SHOWING_SIGNALS = function SHOWING_SIGNALS(totalSignalsFormatted, totalSignals) {
  return _i18n.i18n.translate('xpack.siem.detectionEngine.signals.utilityBar.showingSignalsTitle', {
    values: {
      totalSignalsFormatted: totalSignalsFormatted,
      totalSignals: totalSignals
    },
    defaultMessage: 'Showing {totalSignalsFormatted} {totalSignals, plural, =1 {signal} other {signals}}'
  });
};

exports.SHOWING_SIGNALS = SHOWING_SIGNALS;

var SELECTED_SIGNALS = function SELECTED_SIGNALS(selectedSignalsFormatted, selectedSignals) {
  return _i18n.i18n.translate('xpack.siem.detectionEngine.signals.utilityBar.selectedSignalsTitle', {
    values: {
      selectedSignalsFormatted: selectedSignalsFormatted,
      selectedSignals: selectedSignals
    },
    defaultMessage: 'Selected {selectedSignalsFormatted} {selectedSignals, plural, =1 {signal} other {signals}}'
  });
};

exports.SELECTED_SIGNALS = SELECTED_SIGNALS;

var SELECT_ALL_SIGNALS = function SELECT_ALL_SIGNALS(totalSignalsFormatted, totalSignals) {
  return _i18n.i18n.translate('xpack.siem.detectionEngine.signals.utilityBar.selectAllSignalsTitle', {
    values: {
      totalSignalsFormatted: totalSignalsFormatted,
      totalSignals: totalSignals
    },
    defaultMessage: 'Select all {totalSignalsFormatted} {totalSignals, plural, =1 {signal} other {signals}}'
  });
};

exports.SELECT_ALL_SIGNALS = SELECT_ALL_SIGNALS;

var CLEAR_SELECTION = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.utilityBar.clearSelectionTitle', {
  defaultMessage: 'Clear selection'
});

exports.CLEAR_SELECTION = CLEAR_SELECTION;

var BATCH_ACTIONS = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.utilityBar.batchActionsTitle', {
  defaultMessage: 'Batch actions'
});

exports.BATCH_ACTIONS = BATCH_ACTIONS;

var BATCH_ACTION_VIEW_SELECTED_IN_HOSTS = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.utilityBar.batchActions.viewSelectedInHostsTitle', {
  defaultMessage: 'View selected in hosts'
});

exports.BATCH_ACTION_VIEW_SELECTED_IN_HOSTS = BATCH_ACTION_VIEW_SELECTED_IN_HOSTS;

var BATCH_ACTION_VIEW_SELECTED_IN_NETWORK = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.utilityBar.batchActions.viewSelectedInNetworkTitle', {
  defaultMessage: 'View selected in network'
});

exports.BATCH_ACTION_VIEW_SELECTED_IN_NETWORK = BATCH_ACTION_VIEW_SELECTED_IN_NETWORK;

var BATCH_ACTION_VIEW_SELECTED_IN_TIMELINE = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.utilityBar.batchActions.viewSelectedInTimelineTitle', {
  defaultMessage: 'View selected in timeline'
});

exports.BATCH_ACTION_VIEW_SELECTED_IN_TIMELINE = BATCH_ACTION_VIEW_SELECTED_IN_TIMELINE;

var BATCH_ACTION_OPEN_SELECTED = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.utilityBar.batchActions.openSelectedTitle', {
  defaultMessage: 'Open selected'
});

exports.BATCH_ACTION_OPEN_SELECTED = BATCH_ACTION_OPEN_SELECTED;

var BATCH_ACTION_CLOSE_SELECTED = _i18n.i18n.translate('xpack.siem.detectionEngine.signals.utilityBar.batchActions.closeSelectedTitle', {
  defaultMessage: 'Close selected'
});

exports.BATCH_ACTION_CLOSE_SELECTED = BATCH_ACTION_CLOSE_SELECTED;