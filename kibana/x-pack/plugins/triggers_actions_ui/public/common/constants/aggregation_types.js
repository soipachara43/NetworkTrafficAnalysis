"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.builtInAggregationTypes = exports.AGGREGATION_TYPES = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var AGGREGATION_TYPES;
exports.AGGREGATION_TYPES = AGGREGATION_TYPES;

(function (AGGREGATION_TYPES) {
  AGGREGATION_TYPES["COUNT"] = "count";
  AGGREGATION_TYPES["AVERAGE"] = "avg";
  AGGREGATION_TYPES["SUM"] = "sum";
  AGGREGATION_TYPES["MIN"] = "min";
  AGGREGATION_TYPES["MAX"] = "max";
})(AGGREGATION_TYPES || (exports.AGGREGATION_TYPES = AGGREGATION_TYPES = {}));

var builtInAggregationTypes = {
  count: {
    text: 'count()',
    fieldRequired: false,
    value: AGGREGATION_TYPES.COUNT,
    validNormalizedTypes: []
  },
  avg: {
    text: 'average()',
    fieldRequired: true,
    validNormalizedTypes: ['number'],
    value: AGGREGATION_TYPES.AVERAGE
  },
  sum: {
    text: 'sum()',
    fieldRequired: true,
    validNormalizedTypes: ['number'],
    value: AGGREGATION_TYPES.SUM
  },
  min: {
    text: 'min()',
    fieldRequired: true,
    validNormalizedTypes: ['number', 'date'],
    value: AGGREGATION_TYPES.MIN
  },
  max: {
    text: 'max()',
    fieldRequired: true,
    validNormalizedTypes: ['number', 'date'],
    value: AGGREGATION_TYPES.MAX
  }
};
exports.builtInAggregationTypes = builtInAggregationTypes;