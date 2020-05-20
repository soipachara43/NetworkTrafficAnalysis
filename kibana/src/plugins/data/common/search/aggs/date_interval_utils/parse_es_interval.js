"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseEsInterval = parseEsInterval;

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

var _invalid_es_calendar_interval_error = require("./invalid_es_calendar_interval_error");

var _invalid_es_interval_format_error = require("./invalid_es_interval_format_error");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
const ES_INTERVAL_STRING_REGEX = new RegExp('^([1-9][0-9]*)\\s*(' + _datemath.default.units.join('|') + ')$');

/**
 * Extracts interval properties from an ES interval string. Disallows unrecognized interval formats
 * and fractional values. Converts some intervals from "calendar" to "fixed" when the number of
 * units is larger than 1, and throws an error for others.
 *
 * Conversion rules:
 *
 * | Interval | Single unit type | Multiple units type |
 * | -------- | ---------------- | ------------------- |
 * | ms       | fixed            | fixed               |
 * | s        | fixed            | fixed               |
 * | m        | calendar         | fixed               |
 * | h        | calendar         | fixed               |
 * | d        | calendar         | fixed               |
 * | w        | calendar         | N/A - disallowed    |
 * | M        | calendar         | N/A - disallowed    |
 * | y        | calendar         | N/A - disallowed    |
 *
 */
function parseEsInterval(interval) {
  const matches = String(interval).trim().match(ES_INTERVAL_STRING_REGEX);

  if (!matches) {
    throw new _invalid_es_interval_format_error.InvalidEsIntervalFormatError(interval);
  }

  const value = parseFloat(matches[1]);
  const unit = matches[2];
  const type = _datemath.default.unitsMap[unit].type;

  if (type === 'calendar' && value !== 1) {
    throw new _invalid_es_calendar_interval_error.InvalidEsCalendarIntervalError(interval, value, unit, type);
  }

  return {
    value,
    unit,
    type: type === 'mixed' && value === 1 || type === 'calendar' ? 'calendar' : 'fixed'
  };
}