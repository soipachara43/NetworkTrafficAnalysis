"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kqlQuerySelector = exports.queriesSelector = exports.isLoadingSelector = exports.toStrSelector = exports.fromStrSelector = exports.endSelector = exports.startSelector = exports.kindSelector = exports.durationSelector = exports.policySelector = exports.getQueries = exports.getTimerange = exports.getPolicy = void 0;

var _reselect = require("reselect");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getPolicy = function getPolicy(inputState) {
  return inputState.policy;
};

exports.getPolicy = getPolicy;

var getTimerange = function getTimerange(inputState) {
  return inputState.timerange;
};

exports.getTimerange = getTimerange;

var getQueries = function getQueries(inputState) {
  return inputState.queries;
};

exports.getQueries = getQueries;

var policySelector = function policySelector() {
  return (0, _reselect.createSelector)(getPolicy, function (policy) {
    return policy.kind;
  });
};

exports.policySelector = policySelector;

var durationSelector = function durationSelector() {
  return (0, _reselect.createSelector)(getPolicy, function (policy) {
    return policy.duration;
  });
};

exports.durationSelector = durationSelector;

var kindSelector = function kindSelector() {
  return (0, _reselect.createSelector)(getTimerange, function (timerange) {
    return timerange.kind;
  });
};

exports.kindSelector = kindSelector;

var startSelector = function startSelector() {
  return (0, _reselect.createSelector)(getTimerange, function (timerange) {
    return timerange.from;
  });
};

exports.startSelector = startSelector;

var endSelector = function endSelector() {
  return (0, _reselect.createSelector)(getTimerange, function (timerange) {
    return timerange.to;
  });
};

exports.endSelector = endSelector;

var fromStrSelector = function fromStrSelector() {
  return (0, _reselect.createSelector)(getTimerange, function (timerange) {
    return timerange.fromStr;
  });
};

exports.fromStrSelector = fromStrSelector;

var toStrSelector = function toStrSelector() {
  return (0, _reselect.createSelector)(getTimerange, function (timerange) {
    return timerange.toStr;
  });
};

exports.toStrSelector = toStrSelector;

var isLoadingSelector = function isLoadingSelector() {
  return (0, _reselect.createSelector)(getQueries, function (queries) {
    return queries.some(function (i) {
      return i.loading === true;
    });
  });
};

exports.isLoadingSelector = isLoadingSelector;

var queriesSelector = function queriesSelector() {
  return (0, _reselect.createSelector)(getQueries, function (queries) {
    return queries.filter(function (q) {
      return q.id !== 'kql';
    });
  });
};

exports.queriesSelector = queriesSelector;

var kqlQuerySelector = function kqlQuerySelector() {
  return (0, _reselect.createSelector)(getQueries, function (queries) {
    return queries.find(function (q) {
      return q.id === 'kql';
    });
  });
};

exports.kqlQuerySelector = kqlQuerySelector;