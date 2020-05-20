"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useServiceTransactionTypes = useServiceTransactionTypes;

var _useFetcher2 = require("./useFetcher");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var INITIAL_DATA = {
  transactionTypes: []
};

function useServiceTransactionTypes(urlParams) {
  var serviceName = urlParams.serviceName,
      start = urlParams.start,
      end = urlParams.end;

  var _useFetcher = (0, _useFetcher2.useFetcher)(function (callApmApi) {
    if (serviceName && start && end) {
      return callApmApi({
        pathname: '/api/apm/services/{serviceName}/transaction_types',
        params: {
          path: {
            serviceName: serviceName
          },
          query: {
            start: start,
            end: end
          }
        }
      });
    }
  }, [serviceName, start, end]),
      _useFetcher$data = _useFetcher.data,
      data = _useFetcher$data === void 0 ? INITIAL_DATA : _useFetcher$data;

  return data.transactionTypes;
}