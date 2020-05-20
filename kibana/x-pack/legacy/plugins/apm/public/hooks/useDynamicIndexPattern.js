"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDynamicIndexPattern = useDynamicIndexPattern;

var _useFetcher2 = require("./useFetcher");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function useDynamicIndexPattern(processorEvent) {
  var _useFetcher = (0, _useFetcher2.useFetcher)(function (callApmApi) {
    return callApmApi({
      pathname: '/api/apm/index_pattern/dynamic',
      isCachable: true,
      params: {
        query: {
          processorEvent: processorEvent
        }
      }
    });
  }, [processorEvent]),
      data = _useFetcher.data,
      status = _useFetcher.status;

  return {
    indexPattern: data === null || data === void 0 ? void 0 : data.dynamicIndexPattern,
    status: status
  };
}