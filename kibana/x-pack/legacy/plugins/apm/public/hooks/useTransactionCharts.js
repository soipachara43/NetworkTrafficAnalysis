"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTransactionCharts = useTransactionCharts;

var _react = require("react");

var _chartSelectors = require("../selectors/chartSelectors");

var _useFetcher2 = require("./useFetcher");

var _useUrlParams2 = require("./useUrlParams");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function useTransactionCharts() {
  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      _useUrlParams$urlPara = _useUrlParams.urlParams,
      serviceName = _useUrlParams$urlPara.serviceName,
      transactionType = _useUrlParams$urlPara.transactionType,
      start = _useUrlParams$urlPara.start,
      end = _useUrlParams$urlPara.end,
      transactionName = _useUrlParams$urlPara.transactionName,
      uiFilters = _useUrlParams.uiFilters;

  var _useFetcher = (0, _useFetcher2.useFetcher)(function (callApmApi) {
    if (serviceName && start && end) {
      return callApmApi({
        pathname: '/api/apm/services/{serviceName}/transaction_groups/charts',
        params: {
          path: {
            serviceName: serviceName
          },
          query: {
            start: start,
            end: end,
            transactionType: transactionType,
            transactionName: transactionName,
            uiFilters: JSON.stringify(uiFilters)
          }
        }
      });
    }
  }, [serviceName, start, end, transactionName, transactionType, uiFilters]),
      data = _useFetcher.data,
      error = _useFetcher.error,
      status = _useFetcher.status;

  var memoizedData = (0, _react.useMemo)(function () {
    return (0, _chartSelectors.getTransactionCharts)({
      transactionType: transactionType
    }, data);
  }, [data, transactionType]);
  return {
    data: memoizedData,
    status: status,
    error: error
  };
}