"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDiscoverQuery = getDiscoverQuery;
exports.DiscoverTransactionLink = void 0;

var _react = _interopRequireDefault(require("react"));

var _elasticsearch_fieldnames = require("../../../../../../../../plugins/apm/common/elasticsearch_fieldnames");

var _DiscoverLink = require("./DiscoverLink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getDiscoverQuery(transaction) {
  var transactionId = transaction.transaction.id;
  var traceId = transaction.trace.id;
  var query = "".concat(_elasticsearch_fieldnames.PROCESSOR_EVENT, ":\"transaction\" AND ").concat(_elasticsearch_fieldnames.TRANSACTION_ID, ":\"").concat(transactionId, "\"");

  if (traceId) {
    query += " AND ".concat(_elasticsearch_fieldnames.TRACE_ID, ":\"").concat(traceId, "\"");
  }

  return {
    _a: {
      interval: 'auto',
      query: {
        language: 'kuery',
        query: query
      }
    }
  };
}

var DiscoverTransactionLink = function DiscoverTransactionLink(_ref) {
  var transaction = _ref.transaction,
      children = _ref.children;
  return _react.default.createElement(_DiscoverLink.DiscoverLink, {
    query: getDiscoverQuery(transaction),
    children: children
  });
};

exports.DiscoverTransactionLink = DiscoverTransactionLink;