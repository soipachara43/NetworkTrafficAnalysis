"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWaterfall = useWaterfall;

var _react = require("react");

var _useFetcher2 = require("./useFetcher");

var _waterfall_helpers = require("../components/app/TransactionDetails/WaterfallWithSummmary/WaterfallContainer/Waterfall/waterfall_helpers/waterfall_helpers");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var INITIAL_DATA = {
  root: undefined,
  trace: {
    items: [],
    exceedsMax: false,
    errorDocs: []
  },
  errorsPerTransaction: {}
};

function useWaterfall(urlParams) {
  var traceId = urlParams.traceId,
      start = urlParams.start,
      end = urlParams.end,
      transactionId = urlParams.transactionId;

  var _useFetcher = (0, _useFetcher2.useFetcher)(function (callApmApi) {
    if (traceId && start && end) {
      return callApmApi({
        pathname: '/api/apm/traces/{traceId}',
        params: {
          path: {
            traceId: traceId
          },
          query: {
            start: start,
            end: end
          }
        }
      });
    }
  }, [traceId, start, end]),
      _useFetcher$data = _useFetcher.data,
      data = _useFetcher$data === void 0 ? INITIAL_DATA : _useFetcher$data,
      status = _useFetcher.status,
      error = _useFetcher.error;

  var waterfall = (0, _react.useMemo)(function () {
    return (0, _waterfall_helpers.getWaterfall)(data, transactionId);
  }, [data, transactionId]);
  return {
    waterfall: waterfall,
    status: status,
    error: error,
    exceedsMax: data.trace.exceedsMax
  };
}