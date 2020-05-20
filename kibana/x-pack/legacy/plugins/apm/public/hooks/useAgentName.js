"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAgentName = useAgentName;

var _useFetcher2 = require("./useFetcher");

var _useUrlParams2 = require("./useUrlParams");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function useAgentName() {
  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      urlParams = _useUrlParams.urlParams;

  var start = urlParams.start,
      end = urlParams.end,
      serviceName = urlParams.serviceName;

  var _useFetcher = (0, _useFetcher2.useFetcher)(function (callApmApi) {
    if (serviceName && start && end) {
      return callApmApi({
        pathname: '/api/apm/services/{serviceName}/agent_name',
        params: {
          path: {
            serviceName: serviceName
          },
          query: {
            start: start,
            end: end
          }
        }
      }).then(function (res) {
        return res.agentName;
      });
    }
  }, [serviceName, start, end]),
      agentName = _useFetcher.data,
      error = _useFetcher.error,
      status = _useFetcher.status;

  return {
    agentName: agentName,
    status: status,
    error: error
  };
}