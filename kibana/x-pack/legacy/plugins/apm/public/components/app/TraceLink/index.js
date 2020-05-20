"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TraceLink = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _url = _interopRequireDefault(require("url"));

var _elasticsearch_fieldnames = require("../../../../../../../plugins/apm/common/elasticsearch_fieldnames");

var _useFetcher2 = require("../../../hooks/useFetcher");

var _useUrlParams2 = require("../../../hooks/useUrlParams");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CentralizedContainer = _styledComponents.default.div.withConfig({
  displayName: "CentralizedContainer",
  componentId: "p7bj0u-0"
})(["height:100%;display:flex;"]);

var redirectToTransactionDetailPage = function redirectToTransactionDetailPage(_ref) {
  var transaction = _ref.transaction,
      rangeFrom = _ref.rangeFrom,
      rangeTo = _ref.rangeTo;
  return _url.default.format({
    pathname: "/services/".concat(transaction.service.name, "/transactions/view"),
    query: {
      traceId: transaction.trace.id,
      transactionId: transaction.transaction.id,
      transactionName: transaction.transaction.name,
      transactionType: transaction.transaction.type,
      rangeFrom: rangeFrom,
      rangeTo: rangeTo
    }
  });
};

var redirectToTracePage = function redirectToTracePage(_ref2) {
  var traceId = _ref2.traceId,
      rangeFrom = _ref2.rangeFrom,
      rangeTo = _ref2.rangeTo;
  return _url.default.format({
    pathname: "/traces",
    query: {
      kuery: encodeURIComponent("".concat(_elasticsearch_fieldnames.TRACE_ID, " : \"").concat(traceId, "\"")),
      rangeFrom: rangeFrom,
      rangeTo: rangeTo
    }
  });
};

var TraceLink = function TraceLink() {
  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      urlParams = _useUrlParams.urlParams;

  var traceId = urlParams.traceIdLink,
      rangeFrom = urlParams.rangeFrom,
      rangeTo = urlParams.rangeTo;

  var _useFetcher = (0, _useFetcher2.useFetcher)(function (callApmApi) {
    if (traceId) {
      return callApmApi({
        pathname: '/api/apm/transaction/{traceId}',
        params: {
          path: {
            traceId: traceId
          }
        }
      });
    }
  }, [traceId]),
      _useFetcher$data = _useFetcher.data,
      data = _useFetcher$data === void 0 ? {
    transaction: null
  } : _useFetcher$data,
      status = _useFetcher.status;

  if (traceId && status === _useFetcher2.FETCH_STATUS.SUCCESS) {
    var to = data.transaction ? redirectToTransactionDetailPage({
      transaction: data.transaction,
      rangeFrom: rangeFrom,
      rangeTo: rangeTo
    }) : redirectToTracePage({
      traceId: traceId,
      rangeFrom: rangeFrom,
      rangeTo: rangeTo
    });
    return _react.default.createElement(_reactRouterDom.Redirect, {
      to: to
    });
  }

  return _react.default.createElement(CentralizedContainer, null, _react.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "apmTrace",
    title: _react.default.createElement("h2", null, "Fetching trace...")
  }));
};

exports.TraceLink = TraceLink;