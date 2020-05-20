"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCalendarInterval = exports.leastCommonInterval = void 0;

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const leastCommonInterval = (num = 0, base = 0) => Math.max(Math.ceil(num / base) * base, base);

exports.leastCommonInterval = leastCommonInterval;

const isCalendarInterval = ({
  unit,
  value
}) => {
  const {
    unitsMap
  } = _datemath.default;
  return value === 1 && ['calendar', 'mixed'].includes(unitsMap[unit].type);
};

exports.isCalendarInterval = isCalendarInterval;