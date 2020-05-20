"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimelinePolicySelector = exports.getTimelineSelector = exports.globalFiltersQuerySelector = exports.globalSavedQuerySelector = exports.globalQuerySelector = exports.globalSelector = exports.timelineQueryByIdSelector = exports.globalQueryByIdSelector = exports.globalQuery = exports.globalPolicySelector = exports.globalTimeRangeSelector = exports.timelineTimeRangeSelector = exports.inputsSelector = void 0;

var _reselect = require("reselect");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var selectInputs = function selectInputs(state) {
  return state.inputs;
};

var selectGlobal = function selectGlobal(state) {
  return state.inputs.global;
};

var selectTimeline = function selectTimeline(state) {
  return state.inputs.timeline;
};

var selectGlobalQuery = function selectGlobalQuery(state, id) {
  return state.inputs.global.queries.find(function (q) {
    return q.id === id;
  }) || {
    id: '',
    inspect: null,
    isInspected: false,
    loading: false,
    refetch: null,
    selectedInspectIndex: 0
  };
};

var selectTimelineQuery = function selectTimelineQuery(state, id) {
  return state.inputs.timeline.queries.find(function (q) {
    return q.id === id;
  }) || state.inputs.global.queries.find(function (q) {
    return q.id === id;
  }) || {
    id: '',
    inspect: null,
    isInspected: false,
    loading: false,
    refetch: null,
    selectedInspectIndex: 0
  };
};

var inputsSelector = function inputsSelector() {
  return (0, _reselect.createSelector)(selectInputs, function (inputs) {
    return inputs;
  });
};

exports.inputsSelector = inputsSelector;
var timelineTimeRangeSelector = (0, _reselect.createSelector)(selectTimeline, function (timeline) {
  return timeline.timerange;
});
exports.timelineTimeRangeSelector = timelineTimeRangeSelector;
var globalTimeRangeSelector = (0, _reselect.createSelector)(selectGlobal, function (global) {
  return global.timerange;
});
exports.globalTimeRangeSelector = globalTimeRangeSelector;
var globalPolicySelector = (0, _reselect.createSelector)(selectGlobal, function (global) {
  return global.policy;
});
exports.globalPolicySelector = globalPolicySelector;
var globalQuery = (0, _reselect.createSelector)(selectGlobal, function (global) {
  return global.queries;
});
exports.globalQuery = globalQuery;

var globalQueryByIdSelector = function globalQueryByIdSelector() {
  return (0, _reselect.createSelector)(selectGlobalQuery, function (query) {
    return query;
  });
};

exports.globalQueryByIdSelector = globalQueryByIdSelector;

var timelineQueryByIdSelector = function timelineQueryByIdSelector() {
  return (0, _reselect.createSelector)(selectTimelineQuery, function (query) {
    return query;
  });
};

exports.timelineQueryByIdSelector = timelineQueryByIdSelector;

var globalSelector = function globalSelector() {
  return (0, _reselect.createSelector)(selectGlobal, function (global) {
    return global;
  });
};

exports.globalSelector = globalSelector;

var globalQuerySelector = function globalQuerySelector() {
  return (0, _reselect.createSelector)(selectGlobal, function (global) {
    return global.query || {
      query: '',
      language: 'kuery'
    };
  });
};

exports.globalQuerySelector = globalQuerySelector;

var globalSavedQuerySelector = function globalSavedQuerySelector() {
  return (0, _reselect.createSelector)(selectGlobal, function (global) {
    return global.savedQuery || null;
  });
};

exports.globalSavedQuerySelector = globalSavedQuerySelector;

var globalFiltersQuerySelector = function globalFiltersQuerySelector() {
  return (0, _reselect.createSelector)(selectGlobal, function (global) {
    return global.filters || [];
  });
};

exports.globalFiltersQuerySelector = globalFiltersQuerySelector;

var getTimelineSelector = function getTimelineSelector() {
  return (0, _reselect.createSelector)(selectTimeline, function (timeline) {
    return timeline;
  });
};

exports.getTimelineSelector = getTimelineSelector;

var getTimelinePolicySelector = function getTimelinePolicySelector() {
  return (0, _reselect.createSelector)(selectTimeline, function (timeline) {
    return timeline.policy;
  });
};

exports.getTimelinePolicySelector = getTimelinePolicySelector;