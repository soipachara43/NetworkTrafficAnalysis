"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorGroupOverview = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _useFetcher3 = require("../../../hooks/useFetcher");

var _Distribution = require("../ErrorGroupDetails/Distribution");

var _List = require("./List");

var _useUrlParams2 = require("../../../hooks/useUrlParams");

var _public = require("../../../../../../../plugins/observability/public");

var _typings = require("../../../../../../../plugins/apm/common/projections/typings");

var _LocalUIFilters = require("../../shared/LocalUIFilters");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ErrorGroupOverview = function ErrorGroupOverview() {
  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      urlParams = _useUrlParams.urlParams,
      uiFilters = _useUrlParams.uiFilters;

  var serviceName = urlParams.serviceName,
      start = urlParams.start,
      end = urlParams.end,
      sortField = urlParams.sortField,
      sortDirection = urlParams.sortDirection;

  var _useFetcher = (0, _useFetcher3.useFetcher)(function (callApmApi) {
    if (serviceName && start && end) {
      return callApmApi({
        pathname: '/api/apm/services/{serviceName}/errors/distribution',
        params: {
          path: {
            serviceName: serviceName
          },
          query: {
            start: start,
            end: end,
            uiFilters: JSON.stringify(uiFilters)
          }
        }
      });
    }
  }, [serviceName, start, end, uiFilters]),
      errorDistributionData = _useFetcher.data;

  var _useFetcher2 = (0, _useFetcher3.useFetcher)(function (callApmApi) {
    var normalizedSortDirection = sortDirection === 'asc' ? 'asc' : 'desc';

    if (serviceName && start && end) {
      return callApmApi({
        pathname: '/api/apm/services/{serviceName}/errors',
        params: {
          path: {
            serviceName: serviceName
          },
          query: {
            start: start,
            end: end,
            sortField: sortField,
            sortDirection: normalizedSortDirection,
            uiFilters: JSON.stringify(uiFilters)
          }
        }
      });
    }
  }, [serviceName, start, end, sortField, sortDirection, uiFilters]),
      errorGroupListData = _useFetcher2.data;

  (0, _public.useTrackPageview)({
    app: 'apm',
    path: 'error_group_overview'
  });
  (0, _public.useTrackPageview)({
    app: 'apm',
    path: 'error_group_overview',
    delay: 15000
  });
  var localUIFiltersConfig = (0, _react.useMemo)(function () {
    var config = {
      filterNames: ['host', 'containerId', 'podName', 'serviceVersion'],
      params: {
        serviceName: serviceName
      },
      projection: _typings.PROJECTION.ERROR_GROUPS
    };
    return config;
  }, [serviceName]);

  if (!errorDistributionData || !errorGroupListData) {
    return null;
  }

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: 1
  }, _react.default.createElement(_LocalUIFilters.LocalUIFilters, localUIFiltersConfig)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 7
  }, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_Distribution.ErrorDistribution, {
    distribution: errorDistributionData,
    title: _i18n.i18n.translate('xpack.apm.serviceDetails.metrics.errorOccurrencesChartTitle', {
      defaultMessage: 'Error occurrences'
    })
  })))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h3", null, "Errors")), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_List.ErrorGroupList, {
    items: errorGroupListData
  })))));
};

exports.ErrorGroupOverview = ErrorGroupOverview;