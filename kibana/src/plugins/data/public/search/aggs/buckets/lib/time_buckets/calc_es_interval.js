"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertDurationToNormalizedEsInterval = convertDurationToNormalizedEsInterval;
exports.convertIntervalToEsInterval = convertIntervalToEsInterval;

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

var _common = require("../../../../../../common");

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
var unitsDesc = _datemath.default.unitsDesc;
var largeMax = unitsDesc.indexOf('M');

/**
 * Convert a moment.duration into an es
 * compatible expression, and provide
 * associated metadata
 *
 * @param  {moment.duration} duration
 * @return {object}
 */
function convertDurationToNormalizedEsInterval(duration) {
  for (var i = 0; i < unitsDesc.length; i++) {
    var unit = unitsDesc[i];
    var val = duration.as(unit); // find a unit that rounds neatly

    if (val >= 1 && Math.floor(val) === val) {
      // if the unit is "large", like years, but
      // isn't set to 1 ES will puke. So keep going until
      // we get out of the "large" units
      if (i <= largeMax && val !== 1) {
        continue;
      }

      return {
        value: val,
        unit: unit,
        expression: val + unit
      };
    }
  }

  var ms = duration.as('ms');
  return {
    value: ms,
    unit: 'ms',
    expression: ms + 'ms'
  };
}

function convertIntervalToEsInterval(interval) {
  var _parseEsInterval = (0, _common.parseEsInterval)(interval),
      value = _parseEsInterval.value,
      unit = _parseEsInterval.unit;

  return {
    value: value,
    unit: unit,
    expression: interval
  };
}