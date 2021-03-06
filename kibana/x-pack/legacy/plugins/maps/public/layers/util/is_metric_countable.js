"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMetricCountable = isMetricCountable;

var _constants = require("../../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function isMetricCountable(aggType) {
  return [_constants.AGG_TYPE.COUNT, _constants.AGG_TYPE.SUM, _constants.AGG_TYPE.UNIQUE_COUNT].includes(aggType);
}