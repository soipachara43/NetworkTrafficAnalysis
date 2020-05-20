"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionSummary = void 0;

var _react = _interopRequireDefault(require("react"));

var _ = require("./");

var _TimestampTooltip = require("../TimestampTooltip");

var _DurationSummaryItem = require("./DurationSummaryItem");

var _ErrorCountSummaryItemBadge = require("./ErrorCountSummaryItemBadge");

var _agent_name = require("../../../../../../../plugins/apm/common/agent_name");

var _HttpInfoSummaryItem = require("./HttpInfoSummaryItem");

var _TransactionResultSummaryItem = require("./TransactionResultSummaryItem");

var _UserAgentSummaryItem = require("./UserAgentSummaryItem");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getTransactionResultSummaryItem = function getTransactionResultSummaryItem(transaction) {
  var _transaction$transact, _transaction$url;

  var result = transaction.transaction.result;
  var isRumAgent = (0, _agent_name.isRumAgentName)(transaction.agent.name);
  var url = isRumAgent ? (_transaction$transact = transaction.transaction.page) === null || _transaction$transact === void 0 ? void 0 : _transaction$transact.url : (_transaction$url = transaction.url) === null || _transaction$url === void 0 ? void 0 : _transaction$url.full;

  if (url) {
    var _transaction$http, _transaction$http$req, _transaction$http2, _transaction$http2$re;

    var method = (_transaction$http = transaction.http) === null || _transaction$http === void 0 ? void 0 : (_transaction$http$req = _transaction$http.request) === null || _transaction$http$req === void 0 ? void 0 : _transaction$http$req.method;
    var status = (_transaction$http2 = transaction.http) === null || _transaction$http2 === void 0 ? void 0 : (_transaction$http2$re = _transaction$http2.response) === null || _transaction$http2$re === void 0 ? void 0 : _transaction$http2$re.status_code;
    return _react.default.createElement(_HttpInfoSummaryItem.HttpInfoSummaryItem, {
      method: method,
      status: status,
      url: url
    });
  }

  if (result) {
    return _react.default.createElement(_TransactionResultSummaryItem.TransactionResultSummaryItem, {
      transactionResult: result
    });
  }

  return null;
};

var TransactionSummary = function TransactionSummary(_ref) {
  var transaction = _ref.transaction,
      totalDuration = _ref.totalDuration,
      errorCount = _ref.errorCount;
  var items = [_react.default.createElement(_TimestampTooltip.TimestampTooltip, {
    time: transaction.timestamp.us / 1000
  }), _react.default.createElement(_DurationSummaryItem.DurationSummaryItem, {
    duration: transaction.transaction.duration.us,
    totalDuration: totalDuration,
    parentType: "trace"
  }), getTransactionResultSummaryItem(transaction), errorCount ? _react.default.createElement(_ErrorCountSummaryItemBadge.ErrorCountSummaryItemBadge, {
    count: errorCount
  }) : null, transaction.user_agent ? _react.default.createElement(_UserAgentSummaryItem.UserAgentSummaryItem, transaction.user_agent) : null];
  return _react.default.createElement(_.Summary, {
    items: items
  });
};

exports.TransactionSummary = TransactionSummary;