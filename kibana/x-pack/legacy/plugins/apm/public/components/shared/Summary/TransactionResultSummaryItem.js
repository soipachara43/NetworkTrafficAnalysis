"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionResultSummaryItem = TransactionResultSummaryItem;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function TransactionResultSummaryItem(_ref) {
  var transactionResult = _ref.transactionResult;
  return _react.default.createElement(_eui.EuiToolTip, {
    content: _i18n.i18n.translate('xpack.apm.transactionDetails.resultLabel', {
      defaultMessage: 'Result'
    })
  }, _react.default.createElement(_eui.EuiBadge, {
    color: "default",
    title: undefined
  }, transactionResult));
}