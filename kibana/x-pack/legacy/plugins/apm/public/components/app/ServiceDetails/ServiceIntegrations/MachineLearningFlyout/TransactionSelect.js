"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionSelect = TransactionSelect;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function TransactionSelect(_ref) {
  var transactionTypes = _ref.transactionTypes,
      onChange = _ref.onChange,
      selectedTransactionType = _ref.selectedTransactionType;
  return _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.selectTransactionTypeLabel', {
      defaultMessage: 'Select a transaction type for this job'
    })
  }, _react.default.createElement(_eui.EuiSuperSelect, {
    valueOfSelected: selectedTransactionType,
    onChange: onChange,
    options: transactionTypes.map(function (transactionType) {
      return {
        value: transactionType,
        inputDisplay: transactionType,
        dropdownDisplay: _react.default.createElement(_eui.EuiFlexGroup, {
          justifyContent: "spaceBetween"
        }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiText, null, transactionType)))
      };
    })
  }));
}