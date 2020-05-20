"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DurationSummaryItem = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _PercentOfParent = require("../../app/TransactionDetails/WaterfallWithSummmary/PercentOfParent");

var _formatters = require("../../../utils/formatters");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DurationSummaryItem = function DurationSummaryItem(_ref) {
  var duration = _ref.duration,
      totalDuration = _ref.totalDuration,
      parentType = _ref.parentType;
  var calculatedTotalDuration = totalDuration === undefined ? duration : totalDuration;

  var label = _i18n.i18n.translate('xpack.apm.transactionDurationLabel', {
    defaultMessage: 'Duration'
  });

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiToolTip, {
    content: label
  }, _react.default.createElement(_eui.EuiText, null, (0, _formatters.asDuration)(duration))), "\xA0", _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _react.default.createElement(_PercentOfParent.PercentOfParent, {
    duration: duration,
    totalDuration: calculatedTotalDuration,
    parentType: parentType
  })));
};

exports.DurationSummaryItem = DurationSummaryItem;