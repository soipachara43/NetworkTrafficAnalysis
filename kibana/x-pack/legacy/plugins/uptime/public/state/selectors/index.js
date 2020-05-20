"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexStatusSelector = exports.selectMonitorStatusAlert = exports.selectAlertFlyoutVisibility = exports.selectDurationLines = exports.anomaliesSelector = exports.isMLJobDeletedSelector = exports.isMLJobDeletingSelector = exports.isMLJobCreatingSelector = exports.hasNewMLJobSelector = exports.hasMLJobSelector = exports.canDeleteMLJobSelector = exports.canCreateMLJobSelector = exports.hasMLFeatureAvailable = exports.selectPingHistogram = exports.selectIndexPattern = exports.selectDynamicSettings = exports.selectMonitorStatus = exports.selectSelectedMonitor = exports.monitorLocationsSelector = exports.monitorDetailsSelector = exports.isIntegrationsPopupOpen = exports.getBasePath = void 0;

var _reselect = require("reselect");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// UI Selectors
var getBasePath = function getBasePath(_ref) {
  var basePath = _ref.ui.basePath;
  return basePath;
};

exports.getBasePath = getBasePath;

var isIntegrationsPopupOpen = function isIntegrationsPopupOpen(_ref2) {
  var integrationsPopoverOpen = _ref2.ui.integrationsPopoverOpen;
  return integrationsPopoverOpen;
}; // Monitor Selectors


exports.isIntegrationsPopupOpen = isIntegrationsPopupOpen;

var monitorDetailsSelector = function monitorDetailsSelector(state, summary) {
  return state.monitor.monitorDetailsList[summary.monitor_id];
};

exports.monitorDetailsSelector = monitorDetailsSelector;

var monitorLocationsSelector = function monitorLocationsSelector(state, monitorId) {
  var _state$monitor$monito;

  return (_state$monitor$monito = state.monitor.monitorLocationsList) === null || _state$monitor$monito === void 0 ? void 0 : _state$monitor$monito.get(monitorId);
};

exports.monitorLocationsSelector = monitorLocationsSelector;

var selectSelectedMonitor = function selectSelectedMonitor(state) {
  return state.monitorStatus.monitor;
};

exports.selectSelectedMonitor = selectSelectedMonitor;

var selectMonitorStatus = function selectMonitorStatus(state) {
  return state.monitorStatus.status;
};

exports.selectMonitorStatus = selectMonitorStatus;

var selectDynamicSettings = function selectDynamicSettings(state) {
  return state.dynamicSettings;
};

exports.selectDynamicSettings = selectDynamicSettings;

var selectIndexPattern = function selectIndexPattern(_ref3) {
  var indexPattern = _ref3.indexPattern;
  return {
    indexPattern: indexPattern.index_pattern,
    loading: indexPattern.loading
  };
};

exports.selectIndexPattern = selectIndexPattern;

var selectPingHistogram = function selectPingHistogram(_ref4) {
  var ping = _ref4.ping,
      ui = _ref4.ui;
  return {
    data: ping.pingHistogram,
    loading: ping.loading,
    lastRefresh: ui.lastRefresh,
    esKuery: ui.esKuery
  };
};

exports.selectPingHistogram = selectPingHistogram;

var mlCapabilitiesSelector = function mlCapabilitiesSelector(state) {
  return state.ml.mlCapabilities.data;
};

var hasMLFeatureAvailable = (0, _reselect.createSelector)(mlCapabilitiesSelector, function (mlCapabilities) {
  return (mlCapabilities === null || mlCapabilities === void 0 ? void 0 : mlCapabilities.isPlatinumOrTrialLicense) && (mlCapabilities === null || mlCapabilities === void 0 ? void 0 : mlCapabilities.mlFeatureEnabledInSpace);
});
exports.hasMLFeatureAvailable = hasMLFeatureAvailable;
var canCreateMLJobSelector = (0, _reselect.createSelector)(mlCapabilitiesSelector, function (mlCapabilities) {
  return mlCapabilities === null || mlCapabilities === void 0 ? void 0 : mlCapabilities.capabilities.canCreateJob;
});
exports.canCreateMLJobSelector = canCreateMLJobSelector;
var canDeleteMLJobSelector = (0, _reselect.createSelector)(mlCapabilitiesSelector, function (mlCapabilities) {
  return mlCapabilities === null || mlCapabilities === void 0 ? void 0 : mlCapabilities.capabilities.canDeleteJob;
});
exports.canDeleteMLJobSelector = canDeleteMLJobSelector;

var hasMLJobSelector = function hasMLJobSelector(_ref5) {
  var ml = _ref5.ml;
  return ml.mlJob;
};

exports.hasMLJobSelector = hasMLJobSelector;

var hasNewMLJobSelector = function hasNewMLJobSelector(_ref6) {
  var ml = _ref6.ml;
  return ml.createJob;
};

exports.hasNewMLJobSelector = hasNewMLJobSelector;

var isMLJobCreatingSelector = function isMLJobCreatingSelector(_ref7) {
  var ml = _ref7.ml;
  return ml.createJob.loading;
};

exports.isMLJobCreatingSelector = isMLJobCreatingSelector;

var isMLJobDeletingSelector = function isMLJobDeletingSelector(_ref8) {
  var ml = _ref8.ml;
  return ml.deleteJob.loading;
};

exports.isMLJobDeletingSelector = isMLJobDeletingSelector;

var isMLJobDeletedSelector = function isMLJobDeletedSelector(_ref9) {
  var ml = _ref9.ml;
  return ml.deleteJob;
};

exports.isMLJobDeletedSelector = isMLJobDeletedSelector;

var anomaliesSelector = function anomaliesSelector(_ref10) {
  var ml = _ref10.ml;
  return ml.anomalies.data;
};

exports.anomaliesSelector = anomaliesSelector;

var selectDurationLines = function selectDurationLines(_ref11) {
  var monitorDuration = _ref11.monitorDuration;
  return monitorDuration;
};

exports.selectDurationLines = selectDurationLines;

var selectAlertFlyoutVisibility = function selectAlertFlyoutVisibility(_ref12) {
  var alertFlyoutVisible = _ref12.ui.alertFlyoutVisible;
  return alertFlyoutVisible;
};

exports.selectAlertFlyoutVisibility = selectAlertFlyoutVisibility;

var selectMonitorStatusAlert = function selectMonitorStatusAlert(_ref13) {
  var indexPattern = _ref13.indexPattern,
      overviewFilters = _ref13.overviewFilters,
      ui = _ref13.ui;
  return {
    filters: ui.esKuery,
    indexPattern: indexPattern.index_pattern,
    locations: overviewFilters.filters.locations
  };
};

exports.selectMonitorStatusAlert = selectMonitorStatusAlert;

var indexStatusSelector = function indexStatusSelector(_ref14) {
  var indexStatus = _ref14.indexStatus;
  return indexStatus.indexStatus;
};

exports.indexStatusSelector = indexStatusSelector;