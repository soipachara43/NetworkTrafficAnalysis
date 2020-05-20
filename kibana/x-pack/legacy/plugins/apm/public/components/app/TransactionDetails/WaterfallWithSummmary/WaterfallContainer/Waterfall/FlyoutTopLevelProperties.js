"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlyoutTopLevelProperties = FlyoutTopLevelProperties;

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _elasticsearch_fieldnames = require("../../../../../../../../../../plugins/apm/common/elasticsearch_fieldnames");

var _TransactionDetailLink = require("../../../../../shared/Links/apm/TransactionDetailLink");

var _StickyProperties = require("../../../../../shared/StickyProperties");

var _TransactionOverviewLink = require("../../../../../shared/Links/apm/TransactionOverviewLink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function FlyoutTopLevelProperties(_ref) {
  var transaction = _ref.transaction;

  if (!transaction) {
    return null;
  }

  var stickyProperties = [{
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
  }];
  return _react.default.createElement(_StickyProperties.StickyProperties, {
    stickyProperties: stickyProperties
  });
}