"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aggTypes = void 0;

var _constants = require("../../../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var aggTypes = {
  count: {
    text: 'count()',
    fieldRequired: false,
    value: _constants.AGG_TYPES.COUNT,
    validNormalizedTypes: []
  },
  avg: {
    text: 'average()',
    fieldRequired: true,
    validNormalizedTypes: ['number'],
    value: _constants.AGG_TYPES.AVERAGE
  },
  sum: {
    text: 'sum()',
    fieldRequired: true,
    validNormalizedTypes: ['number'],
    value: _constants.AGG_TYPES.SUM
  },
  min: {
    text: 'min()',
    fieldRequired: true,
    validNormalizedTypes: ['number', 'date'],
    value: _constants.AGG_TYPES.MIN
  },
  max: {
    text: 'max()',
    fieldRequired: true,
    validNormalizedTypes: ['number', 'date'],
    value: _constants.AGG_TYPES.MAX
  }
};
exports.aggTypes = aggTypes;