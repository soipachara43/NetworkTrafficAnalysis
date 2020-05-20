"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alertsSelector = exports.uncommonProcessesSelector = exports.eventsSelector = exports.hostsSelector = exports.authenticationsSelector = void 0;

var _fp = require("lodash/fp");

var _reselect = require("reselect");

var _model = require("./model");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var selectHosts = function selectHosts(state, hostsType) {
  return (0, _fp.get)(hostsType, state.hosts);
};

var authenticationsSelector = function authenticationsSelector() {
  return (0, _reselect.createSelector)(selectHosts, function (hosts) {
    return hosts.queries.authentications;
  });
};

exports.authenticationsSelector = authenticationsSelector;

var hostsSelector = function hostsSelector() {
  return (0, _reselect.createSelector)(selectHosts, function (hosts) {
    return hosts.queries[_model.HostsTableType.hosts];
  });
};

exports.hostsSelector = hostsSelector;

var eventsSelector = function eventsSelector() {
  return (0, _reselect.createSelector)(selectHosts, function (hosts) {
    return hosts.queries.events;
  });
};

exports.eventsSelector = eventsSelector;

var uncommonProcessesSelector = function uncommonProcessesSelector() {
  return (0, _reselect.createSelector)(selectHosts, function (hosts) {
    return hosts.queries.uncommonProcesses;
  });
};

exports.uncommonProcessesSelector = uncommonProcessesSelector;

var alertsSelector = function alertsSelector() {
  return (0, _reselect.createSelector)(selectHosts, function (hosts) {
    return hosts.queries[_model.HostsTableType.alerts];
  });
};

exports.alertsSelector = alertsSelector;