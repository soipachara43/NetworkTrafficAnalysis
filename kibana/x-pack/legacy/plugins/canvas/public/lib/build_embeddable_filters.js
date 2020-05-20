"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQueryFilters = getQueryFilters;
exports.buildEmbeddableFilters = buildEmbeddableFilters;

var _build_bool_array = require("./build_bool_array");

var _public = require("../../../../../../src/plugins/data/public");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore Untyped Local
var TimeFilterType = 'time';

function getTimeRangeFromFilters(filters) {
  var timeFilter = filters.find(function (filter) {
    return filter.type !== undefined && filter.type === TimeFilterType;
  });
  return timeFilter !== undefined && timeFilter.from !== undefined && timeFilter.to !== undefined ? {
    from: timeFilter.from,
    to: timeFilter.to
  } : undefined;
}

function getQueryFilters(filters) {
  return (0, _build_bool_array.buildBoolArray)(filters).map(_public.esFilters.buildQueryFilter);
}

function buildEmbeddableFilters(filters) {
  return {
    timeRange: getTimeRangeFromFilters(filters),
    filters: getQueryFilters(filters)
  };
}