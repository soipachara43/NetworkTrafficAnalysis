"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormattedDuration = void 0;

var _react = _interopRequireDefault(require("react"));

var _helpers = require("./helpers");

var _tooltip = require("./tooltip");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FormattedDuration = _react.default.memo(function (_ref) {
  var maybeDurationNanoseconds = _ref.maybeDurationNanoseconds,
      tooltipTitle = _ref.tooltipTitle;
  return _react.default.createElement(_tooltip.FormattedDurationTooltip, {
    maybeDurationNanoseconds: maybeDurationNanoseconds,
    tooltipTitle: tooltipTitle
  }, _react.default.createElement("div", {
    "data-test-subj": "formatted-duration"
  }, (0, _helpers.getFormattedDurationString)(maybeDurationNanoseconds)));
});

exports.FormattedDuration = FormattedDuration;
FormattedDuration.displayName = 'FormattedDuration';