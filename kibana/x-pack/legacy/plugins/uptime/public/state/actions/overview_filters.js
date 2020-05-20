"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchOverviewFiltersSuccess = exports.fetchOverviewFiltersFail = exports.fetchOverviewFilters = exports.FETCH_OVERVIEW_FILTERS_SUCCESS = exports.FETCH_OVERVIEW_FILTERS_FAIL = exports.FETCH_OVERVIEW_FILTERS = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FETCH_OVERVIEW_FILTERS = 'FETCH_OVERVIEW_FILTERS';
exports.FETCH_OVERVIEW_FILTERS = FETCH_OVERVIEW_FILTERS;
var FETCH_OVERVIEW_FILTERS_FAIL = 'FETCH_OVERVIEW_FILTERS_FAIL';
exports.FETCH_OVERVIEW_FILTERS_FAIL = FETCH_OVERVIEW_FILTERS_FAIL;
var FETCH_OVERVIEW_FILTERS_SUCCESS = 'FETCH_OVERVIEW_FILTERS_SUCCESS';
exports.FETCH_OVERVIEW_FILTERS_SUCCESS = FETCH_OVERVIEW_FILTERS_SUCCESS;

var fetchOverviewFilters = function fetchOverviewFilters(payload) {
  return {
    type: FETCH_OVERVIEW_FILTERS,
    payload: payload
  };
};

exports.fetchOverviewFilters = fetchOverviewFilters;

var fetchOverviewFiltersFail = function fetchOverviewFiltersFail(error) {
  return {
    type: FETCH_OVERVIEW_FILTERS_FAIL,
    payload: error
  };
};

exports.fetchOverviewFiltersFail = fetchOverviewFiltersFail;

var fetchOverviewFiltersSuccess = function fetchOverviewFiltersSuccess(filters) {
  return {
    type: FETCH_OVERVIEW_FILTERS_SUCCESS,
    payload: filters
  };
};

exports.fetchOverviewFiltersSuccess = fetchOverviewFiltersSuccess;