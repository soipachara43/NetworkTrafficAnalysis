"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scoreIntervalToDateTime = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var scoreIntervalToDateTime = function scoreIntervalToDateTime(score, interval) {
  if (interval === 'second' || interval === 'minute' || interval === 'hour') {
    return {
      from: (0, _moment.default)(score.time).subtract(1, 'hour').valueOf(),
      to: (0, _moment.default)(score.time).add(1, 'hour').valueOf()
    };
  } else {
    // default should be a day
    return {
      from: (0, _moment.default)(score.time).subtract(1, 'day').valueOf(),
      to: (0, _moment.default)(score.time).add(1, 'day').valueOf()
    };
  }
};

exports.scoreIntervalToDateTime = scoreIntervalToDateTime;