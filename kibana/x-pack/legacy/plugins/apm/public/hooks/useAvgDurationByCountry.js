"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAvgDurationByCountry = useAvgDurationByCountry;

var _useFetcher2 = require("./useFetcher");

var _useUrlParams2 = require("./useUrlParams");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function useAvgDurationByCountry() {
  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      _useUrlParams$urlPara = _useUrlParams.urlParams,
      serviceName = _useUrlParams$urlPara.serviceName,
      start = _useUrlParams$urlPara.start,
      end = _useUrlParams$urlPara.end,
      transactionName = _useUrlParams$urlPara.transactionName,
      uiFilters = _useUrlParams.uiFilters;

  var _useFetcher = (0, _useFetcher2.useFetcher)(function (callApmApi) {
    if (serviceName && start && end) {
      return callApmApi({
        pathname: '/api/apm/services/{serviceName}/transaction_groups/avg_duration_by_country',
        params: {
          path: {
            serviceName: serviceName
          },
          query: {
            start: start,
            end: end,
            uiFilters: JSON.stringify(uiFilters),
            transactionName: transactionName
          }
        }
      });
    }
  }, [serviceName, start, end, uiFilters, transactionName]),
      _useFetcher$data = _useFetcher.data,
      data = _useFetcher$data === void 0 ? [] : _useFetcher$data,
      error = _useFetcher.error,
      status = _useFetcher.status;

  return {
    data: data,
    status: status,
    error: error
  };
}