"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTransactionDistribution = useTransactionDistribution;

var _useFetcher2 = require("./useFetcher");

var _UrlParamsContext = require("../context/UrlParamsContext");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var INITIAL_DATA = {
  buckets: [],
  noHits: true,
  bucketSize: 0
};

function useTransactionDistribution(urlParams) {
  var serviceName = urlParams.serviceName,
      start = urlParams.start,
      end = urlParams.end,
      transactionType = urlParams.transactionType,
      transactionId = urlParams.transactionId,
      traceId = urlParams.traceId,
      transactionName = urlParams.transactionName;
  var uiFilters = (0, _UrlParamsContext.useUiFilters)(urlParams);

  var _useFetcher = (0, _useFetcher2.useFetcher)(function (callApmApi) {
    if (serviceName && start && end && transactionType && transactionName) {
      return callApmApi({
        pathname: '/api/apm/services/{serviceName}/transaction_groups/distribution',
        params: {
          path: {
            serviceName: serviceName
          },
          query: {
            start: start,
            end: end,
            transactionType: transactionType,
            transactionName: transactionName,
            transactionId: transactionId,
            traceId: traceId,
            uiFilters: JSON.stringify(uiFilters)
          }
        }
      });
    }
  }, // the histogram should not be refetched if the transactionId or traceId changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [serviceName, start, end, transactionType, transactionName, uiFilters]),
      _useFetcher$data = _useFetcher.data,
      data = _useFetcher$data === void 0 ? INITIAL_DATA : _useFetcher$data,
      status = _useFetcher.status,
      error = _useFetcher.error;

  return {
    data: data,
    status: status,
    error: error
  };
}