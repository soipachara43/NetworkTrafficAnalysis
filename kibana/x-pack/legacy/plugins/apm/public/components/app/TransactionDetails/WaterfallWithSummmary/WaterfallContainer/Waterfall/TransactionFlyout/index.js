"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionFlyout = TransactionFlyout;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _TransactionActionMenu = require("../../../../../../shared/TransactionActionMenu/TransactionActionMenu");

var _TransactionSummary = require("../../../../../../shared/Summary/TransactionSummary");

var _FlyoutTopLevelProperties = require("../FlyoutTopLevelProperties");

var _ResponsiveFlyout = require("../ResponsiveFlyout");

var _TransactionMetadata = require("../../../../../../shared/MetadataTable/TransactionMetadata");

var _DroppedSpansWarning = require("./DroppedSpansWarning");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function TransactionPropertiesTable(_ref) {
  var transaction = _ref.transaction;
  return _react.default.createElement("div", null, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h4", null, "Metadata")), _react.default.createElement(_TransactionMetadata.TransactionMetadata, {
    transaction: transaction
  }));
}

function TransactionFlyout(_ref2) {
  var transactionDoc = _ref2.transaction,
      onClose = _ref2.onClose,
      _ref2$errorCount = _ref2.errorCount,
      errorCount = _ref2$errorCount === void 0 ? 0 : _ref2$errorCount,
      rootTransactionDuration = _ref2.rootTransactionDuration;

  if (!transactionDoc) {
    return null;
  }

  return _react.default.createElement(_eui.EuiPortal, null, _react.default.createElement(_ResponsiveFlyout.ResponsiveFlyout, {
    onClose: onClose,
    ownFocus: true,
    maxWidth: false
  }, _react.default.createElement(_eui.EuiFlyoutHeader, {
    hasBorder: true
  }, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h4", null, _i18n.i18n.translate('xpack.apm.transactionDetails.transFlyout.transactionDetailsTitle', {
    defaultMessage: 'Transaction details'
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_TransactionActionMenu.TransactionActionMenu, {
    transaction: transactionDoc
  })))), _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(_FlyoutTopLevelProperties.FlyoutTopLevelProperties, {
    transaction: transactionDoc
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_TransactionSummary.TransactionSummary, {
    transaction: transactionDoc,
    totalDuration: rootTransactionDuration,
    errorCount: errorCount
  }), _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "m"
  }), _react.default.createElement(_DroppedSpansWarning.DroppedSpansWarning, {
    transactionDoc: transactionDoc
  }), _react.default.createElement(TransactionPropertiesTable, {
    transaction: transactionDoc
  }))));
}