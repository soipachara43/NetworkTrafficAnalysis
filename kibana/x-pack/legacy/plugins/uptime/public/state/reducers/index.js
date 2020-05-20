"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootReducer = void 0;

var _redux = require("redux");

var _monitor = require("./monitor");

var _overview_filters = require("./overview_filters");

var _snapshot = require("./snapshot");

var _ui = require("./ui");

var _monitor_status = require("./monitor_status");

var _dynamic_settings = require("./dynamic_settings");

var _index_pattern = require("./index_pattern");

var _ping = require("./ping");

var _monitor_duration = require("./monitor_duration");

var _index_status = require("./index_status");

var _ml_anomaly = require("./ml_anomaly");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var rootReducer = (0, _redux.combineReducers)({
  monitor: _monitor.monitorReducer,
  overviewFilters: _overview_filters.overviewFiltersReducer,
  snapshot: _snapshot.snapshotReducer,
  ui: _ui.uiReducer,
  monitorStatus: _monitor_status.monitorStatusReducer,
  dynamicSettings: _dynamic_settings.dynamicSettingsReducer,
  indexPattern: _index_pattern.indexPatternReducer,
  ping: _ping.pingReducer,
  ml: _ml_anomaly.mlJobsReducer,
  monitorDuration: _monitor_duration.monitorDurationReducer,
  indexStatus: _index_status.indexStatusReducer
});
exports.rootReducer = rootReducer;