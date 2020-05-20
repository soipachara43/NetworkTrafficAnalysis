"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionDetails = TransactionDetails;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _useTransactionCharts2 = require("../../../hooks/useTransactionCharts");

var _useTransactionDistribution = require("../../../hooks/useTransactionDistribution");

var _useWaterfall2 = require("../../../hooks/useWaterfall");

var _TransactionCharts = require("../../shared/charts/TransactionCharts");

var _ApmHeader = require("../../shared/ApmHeader");

var _Distribution = require("./Distribution");

var _WaterfallWithSummmary = require("./WaterfallWithSummmary");

var _useLocation = require("../../../hooks/useLocation");

var _useUrlParams2 = require("../../../hooks/useUrlParams");

var _useFetcher = require("../../../hooks/useFetcher");

var _TransactionBreakdown = require("../../shared/TransactionBreakdown");

var _ChartsSyncContext = require("../../../context/ChartsSyncContext");

var _public = require("../../../../../../../plugins/observability/public");

var _typings = require("../../../../../../../plugins/apm/common/projections/typings");

var _LocalUIFilters = require("../../shared/LocalUIFilters");

var _HeightRetainer = require("../../shared/HeightRetainer");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function TransactionDetails() {
  var _distributionData$buc;

  var location = (0, _useLocation.useLocation)();

  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      urlParams = _useUrlParams.urlParams;

  var _useTransactionDistri = (0, _useTransactionDistribution.useTransactionDistribution)(urlParams),
      distributionData = _useTransactionDistri.data,
      distributionStatus = _useTransactionDistri.status;

  var _useTransactionCharts = (0, _useTransactionCharts2.useTransactionCharts)(),
      transactionChartsData = _useTransactionCharts.data;

  var _useWaterfall = (0, _useWaterfall2.useWaterfall)(urlParams),
      waterfall = _useWaterfall.waterfall,
      exceedsMax = _useWaterfall.exceedsMax,
      waterfallStatus = _useWaterfall.status;

  var transactionName = urlParams.transactionName,
      transactionType = urlParams.transactionType,
      serviceName = urlParams.serviceName;
  (0, _public.useTrackPageview)({
    app: 'apm',
    path: 'transaction_details'
  });
  (0, _public.useTrackPageview)({
    app: 'apm',
    path: 'transaction_details',
    delay: 15000
  });
  var localUIFiltersConfig = (0, _react.useMemo)(function () {
    var config = {
      filterNames: ['transactionResult', 'serviceVersion'],
      projection: _typings.PROJECTION.TRANSACTIONS,
      params: {
        transactionName: transactionName,
        transactionType: transactionType,
        serviceName: serviceName
      }
    };
    return config;
  }, [transactionName, transactionType, serviceName]);
  var bucketIndex = distributionData.buckets.findIndex(function (bucket) {
    return bucket.samples.some(function (sample) {
      return sample.transactionId === urlParams.transactionId && sample.traceId === urlParams.traceId;
    });
  });
  var traceSamples = (_distributionData$buc = distributionData.buckets[bucketIndex]) === null || _distributionData$buc === void 0 ? void 0 : _distributionData$buc.samples;
  return _react.default.createElement("div", null, _react.default.createElement(_ApmHeader.ApmHeader, null, _react.default.createElement(_eui.EuiTitle, {
    size: "l"
  }, _react.default.createElement("h1", null, transactionName))), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: 1
  }, _react.default.createElement(_LocalUIFilters.LocalUIFilters, localUIFiltersConfig)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 7
  }, _react.default.createElement(_ChartsSyncContext.ChartsSyncContextProvider, null, _react.default.createElement(_TransactionBreakdown.TransactionBreakdown, null), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_TransactionCharts.TransactionCharts, {
    hasMLJob: false,
    charts: transactionChartsData,
    urlParams: urlParams,
    location: location
  })), _react.default.createElement(_eui.EuiHorizontalRule, {
    size: "full",
    margin: "l"
  }), _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_Distribution.TransactionDistribution, {
    distribution: distributionData,
    isLoading: distributionStatus === _useFetcher.FETCH_STATUS.LOADING,
    urlParams: urlParams,
    bucketIndex: bucketIndex
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_HeightRetainer.HeightRetainer, null, _react.default.createElement(_WaterfallWithSummmary.WaterfallWithSummmary, {
    location: location,
    urlParams: urlParams,
    waterfall: waterfall,
    isLoading: waterfallStatus === _useFetcher.FETCH_STATUS.LOADING,
    exceedsMax: exceedsMax,
    traceSamples: traceSamples
  })))));
}