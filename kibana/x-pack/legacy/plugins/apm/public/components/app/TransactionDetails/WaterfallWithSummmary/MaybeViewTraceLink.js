"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaybeViewTraceLink = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _TransactionDetailLink = require("../../../shared/Links/apm/TransactionDetailLink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MaybeViewTraceLink = function MaybeViewTraceLink(_ref) {
  var transaction = _ref.transaction,
      waterfall = _ref.waterfall;

  var viewFullTraceButtonLabel = _i18n.i18n.translate('xpack.apm.transactionDetails.viewFullTraceButtonLabel', {
    defaultMessage: 'View full trace'
  });

  var rootTransaction = waterfall.rootTransaction; // the traceroot cannot be found, so we cannot link to it

  if (!rootTransaction) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiToolTip, {
      content: _i18n.i18n.translate('xpack.apm.transactionDetails.noTraceParentButtonTooltip', {
        defaultMessage: 'The trace parent cannot be found'
      })
    }, _react.default.createElement(_eui.EuiButton, {
      iconType: "apmTrace",
      disabled: true
    }, viewFullTraceButtonLabel)));
  }

  var isRoot = transaction.transaction.id === rootTransaction.transaction.id; // the user is already viewing the full trace, so don't link to it

  if (isRoot) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiToolTip, {
      content: _i18n.i18n.translate('xpack.apm.transactionDetails.viewingFullTraceButtonTooltip', {
        defaultMessage: 'Currently viewing the full trace'
      })
    }, _react.default.createElement(_eui.EuiButton, {
      iconType: "apmTrace",
      disabled: true
    }, viewFullTraceButtonLabel))); // the user is viewing a zoomed in version of the trace. Link to the full trace
  } else {
    return _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_TransactionDetailLink.TransactionDetailLink, {
      serviceName: rootTransaction.service.name,
      transactionId: rootTransaction.transaction.id,
      traceId: rootTransaction.trace.id,
      transactionName: rootTransaction.transaction.name,
      transactionType: rootTransaction.transaction.type
    }, _react.default.createElement(_eui.EuiButton, {
      iconType: "apmTrace"
    }, viewFullTraceButtonLabel)));
  }
};

exports.MaybeViewTraceLink = MaybeViewTraceLink;