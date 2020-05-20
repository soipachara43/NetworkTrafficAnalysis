"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersSelector = exports.httpSelector = exports.topCountriesSelector = exports.tlsSelector = exports.topNFlowSelector = exports.dnsSelector = void 0;

var _reselect = require("reselect");

var _fp = require("lodash/fp");

var _types = require("../../graphql/types");

var _reducer = require("./reducer");

var _model = require("./model");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var selectNetworkPage = function selectNetworkPage(state) {
  return state.network.page;
};

var selectNetworkDetails = function selectNetworkDetails(state) {
  return state.network.details;
}; // Network Page Selectors


var dnsSelector = function dnsSelector() {
  return (0, _reselect.createSelector)(selectNetworkPage, function (network) {
    return network.queries.dns;
  });
};

exports.dnsSelector = dnsSelector;

var selectTopNFlowByType = function selectTopNFlowByType(state, networkType, flowTarget) {
  var ft = flowTarget === _types.FlowTargetSourceDest.source ? 'topNFlowSource' : 'topNFlowDestination';
  var nFlowType = networkType === _model.NetworkType.page ? _model.NetworkTableType[ft] : _model.IpDetailsTableType[ft];
  return (0, _fp.get)([networkType, 'queries', nFlowType], state.network) || (0, _fp.get)([networkType, 'queries', nFlowType], _reducer.initialNetworkState);
};

var topNFlowSelector = function topNFlowSelector() {
  return (0, _reselect.createSelector)(selectTopNFlowByType, function (topNFlowQueries) {
    return topNFlowQueries;
  });
};

exports.topNFlowSelector = topNFlowSelector;

var selectTlsByType = function selectTlsByType(state, networkType) {
  var tlsType = networkType === _model.NetworkType.page ? _model.NetworkTableType.tls : _model.IpDetailsTableType.tls;
  return (0, _fp.get)([networkType, 'queries', tlsType], state.network) || (0, _fp.get)([networkType, 'queries', tlsType], _reducer.initialNetworkState);
};

var tlsSelector = function tlsSelector() {
  return (0, _reselect.createSelector)(selectTlsByType, function (tlsQueries) {
    return tlsQueries;
  });
};

exports.tlsSelector = tlsSelector;

var selectTopCountriesByType = function selectTopCountriesByType(state, networkType, flowTarget) {
  var ft = flowTarget === _types.FlowTargetSourceDest.source ? 'topCountriesSource' : 'topCountriesDestination';
  var nFlowType = networkType === _model.NetworkType.page ? _model.NetworkTableType[ft] : _model.IpDetailsTableType[ft];
  return (0, _fp.get)([networkType, 'queries', nFlowType], state.network) || (0, _fp.get)([networkType, 'queries', nFlowType], _reducer.initialNetworkState);
};

var topCountriesSelector = function topCountriesSelector() {
  return (0, _reselect.createSelector)(selectTopCountriesByType, function (topCountriesQueries) {
    return topCountriesQueries;
  });
};

exports.topCountriesSelector = topCountriesSelector;

var selectHttpByType = function selectHttpByType(state, networkType) {
  var httpType = networkType === _model.NetworkType.page ? _model.NetworkTableType.http : _model.IpDetailsTableType.http;
  return (0, _fp.get)([networkType, 'queries', httpType], state.network) || (0, _fp.get)([networkType, 'queries', httpType], _reducer.initialNetworkState);
};

var httpSelector = function httpSelector() {
  return (0, _reselect.createSelector)(selectHttpByType, function (httpQueries) {
    return httpQueries;
  });
};

exports.httpSelector = httpSelector;

var usersSelector = function usersSelector() {
  return (0, _reselect.createSelector)(selectNetworkDetails, function (network) {
    return network.queries.users;
  });
};

exports.usersSelector = usersSelector;