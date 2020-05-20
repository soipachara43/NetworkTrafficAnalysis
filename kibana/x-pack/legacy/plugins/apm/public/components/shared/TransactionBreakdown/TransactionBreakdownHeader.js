"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionBreakdownHeader = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TransactionBreakdownHeader = function TransactionBreakdownHeader(_ref) {
  var showChart = _ref.showChart,
      onToggleClick = _ref.onToggleClick;
  return _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h3", null, _i18n.i18n.translate('xpack.apm.transactionBreakdown.chartTitle', {
    defaultMessage: 'Time spent by span type'
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "xs",
    iconType: showChart ? 'arrowDown' : 'arrowRight',
    onClick: function onClick() {
      return onToggleClick();
    }
  }, showChart ? _i18n.i18n.translate('xpack.apm.transactionBreakdown.hideChart', {
    defaultMessage: 'Hide chart'
  }) : _i18n.i18n.translate('xpack.apm.transactionBreakdown.showChart', {
    defaultMessage: 'Show chart'
  }))));
};

exports.TransactionBreakdownHeader = TransactionBreakdownHeader;