"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimestampTooltip = TimestampTooltip;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _formatters = require("../../../utils/formatters");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function TimestampTooltip(_ref) {
  var time = _ref.time,
      _ref$timeUnit = _ref.timeUnit,
      timeUnit = _ref$timeUnit === void 0 ? 'milliseconds' : _ref$timeUnit;
  var momentTime = (0, _momentTimezone.default)(time);
  var relativeTimeLabel = momentTime.fromNow();
  var absoluteTimeLabel = (0, _formatters.asAbsoluteDateTime)(time, timeUnit);
  return _react.default.createElement(_eui.EuiToolTip, {
    content: absoluteTimeLabel
  }, _react.default.createElement(_react.default.Fragment, null, relativeTimeLabel));
}