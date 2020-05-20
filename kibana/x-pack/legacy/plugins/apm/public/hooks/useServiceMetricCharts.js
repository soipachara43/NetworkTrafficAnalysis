"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useServiceMetricCharts = useServiceMetricCharts;

var _UrlParamsContext = require("../context/UrlParamsContext");

var _useFetcher2 = require("./useFetcher");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
var INITIAL_DATA = {
  charts: []
};

function useServiceMetricCharts(urlParams, agentName) {
  var serviceName = urlParams.serviceName,
      start = urlParams.start,
      end = urlParams.end,
      serviceNodeName = urlParams.serviceNodeName;
  var uiFilters = (0, _UrlParamsContext.useUiFilters)(urlParams);

  var _useFetcher = (0, _useFetcher2.useFetcher)(function (callApmApi) {
    if (serviceName && start && end && agentName) {
      return callApmApi({
        pathname: '/api/apm/services/{serviceName}/metrics/charts',
        params: {
          path: {
            serviceName: serviceName
          },
          query: {
            start: start,
            end: end,
            agentName: agentName,
            serviceNodeName: serviceNodeName,
            uiFilters: JSON.stringify(uiFilters)
          }
        }
      });
    }
  }, [serviceName, start, end, agentName, serviceNodeName, uiFilters]),
      _useFetcher$data = _useFetcher.data,
      data = _useFetcher$data === void 0 ? INITIAL_DATA : _useFetcher$data,
      error = _useFetcher.error,
      status = _useFetcher.status;

  return {
    data: data,
    status: status,
    error: error
  };
}