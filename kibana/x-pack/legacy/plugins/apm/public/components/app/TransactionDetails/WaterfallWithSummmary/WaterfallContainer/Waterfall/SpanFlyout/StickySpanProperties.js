"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StickySpanProperties = StickySpanProperties;

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _elasticsearch_fieldnames = require("../../../../../../../../../../../plugins/apm/common/elasticsearch_fieldnames");

var _i18n2 = require("../../../../../../../../../../../plugins/apm/common/i18n");

var _StickyProperties = require("../../../../../../shared/StickyProperties");

var _TransactionOverviewLink = require("../../../../../../shared/Links/apm/TransactionOverviewLink");

var _TransactionDetailLink = require("../../../../../../shared/Links/apm/TransactionDetailLink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function StickySpanProperties(_ref) {
  var span = _ref.span,
      transaction = _ref.transaction;
  var spanName = span.span.name;
  var transactionStickyProperties = transaction ? [{
    label: _i18n.i18n.translate('xpack.apm.transactionDetails.serviceLabel', {
      defaultMessage: 'Service'
    }),
    fieldName: _elasticsearch_fieldnames.SERVICE_NAME,
    val: _react.default.createElement(_TransactionOverviewLink.TransactionOverviewLink, {
      serviceName: transaction.service.name
    }, transaction.service.name),
    width: '25%'
  }, {
    label: _i18n.i18n.translate('xpack.apm.transactionDetails.transactionLabel', {
      defaultMessage: 'Transaction'
    }),
    fieldName: _elasticsearch_fieldnames.TRANSACTION_NAME,
    val: _react.default.createElement(_TransactionDetailLink.TransactionDetailLink, {
      serviceName: transaction.service.name,
      transactionId: transaction.transaction.id,
      traceId: transaction.trace.id,
      transactionName: transaction.transaction.name,
      transactionType: transaction.transaction.type
    }, transaction.transaction.name),
    width: '25%'
  }] : [];
  var stickyProperties = [{
    label: _i18n.i18n.translate('xpack.apm.transactionDetails.spanFlyout.nameLabel', {
      defaultMessage: 'Name'
    }),
    fieldName: _elasticsearch_fieldnames.SPAN_NAME,
    val: spanName || _i18n2.NOT_AVAILABLE_LABEL,
    truncated: true,
    width: '25%'
  }].concat(transactionStickyProperties);
  return _react.default.createElement(_StickyProperties.StickyProperties, {
    stickyProperties: stickyProperties
  });
}