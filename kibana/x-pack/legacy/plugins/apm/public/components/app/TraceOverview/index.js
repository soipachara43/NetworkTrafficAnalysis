"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TraceOverview = TraceOverview;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _useFetcher2 = require("../../../hooks/useFetcher");

var _TraceList = require("./TraceList");

var _useUrlParams2 = require("../../../hooks/useUrlParams");

var _public = require("../../../../../../../plugins/observability/public");

var _LocalUIFilters = require("../../shared/LocalUIFilters");

var _typings = require("../../../../../../../plugins/apm/common/projections/typings");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function TraceOverview() {
  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      urlParams = _useUrlParams.urlParams,
      uiFilters = _useUrlParams.uiFilters;

  var start = urlParams.start,
      end = urlParams.end;

  var _useFetcher = (0, _useFetcher2.useFetcher)(function (callApmApi) {
    if (start && end) {
      return callApmApi({
        pathname: '/api/apm/traces',
        params: {
          query: {
            start: start,
            end: end,
            uiFilters: JSON.stringify(uiFilters)
          }
        }
      });
    }
  }, [start, end, uiFilters]),
      status = _useFetcher.status,
      _useFetcher$data = _useFetcher.data,
      data = _useFetcher$data === void 0 ? [] : _useFetcher$data;

  (0, _public.useTrackPageview)({
    app: 'apm',
    path: 'traces_overview'
  });
  (0, _public.useTrackPageview)({
    app: 'apm',
    path: 'traces_overview',
    delay: 15000
  });
  var localUIFiltersConfig = (0, _react.useMemo)(function () {
    var config = {
      filterNames: ['transactionResult', 'host', 'containerId', 'podName'],
      projection: _typings.PROJECTION.TRACES
    };
    return config;
  }, []);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: 1
  }, _react.default.createElement(_LocalUIFilters.LocalUIFilters, _extends({}, localUIFiltersConfig, {
    showCount: false
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 7
  }, _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_TraceList.TraceList, {
    items: data,
    isLoading: status === _useFetcher2.FETCH_STATUS.LOADING
  })))));
}