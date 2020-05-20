"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAvgDurationByBrowser = useAvgDurationByBrowser;

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _useFetcher2 = require("./useFetcher");

var _useUrlParams2 = require("./useUrlParams");

var _viz_colors = require("../../../../../plugins/apm/common/viz_colors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function toTimeSeries(data) {
  if (!data) {
    return [];
  }

  return data.map(function (item, index) {
    return _objectSpread({}, item, {
      color: (0, _viz_colors.getVizColorForIndex)(index, _eui_theme_light.default),
      type: 'linemark'
    });
  });
}

function useAvgDurationByBrowser() {
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
        pathname: '/api/apm/services/{serviceName}/transaction_groups/avg_duration_by_browser',
        params: {
          path: {
            serviceName: serviceName
          },
          query: {
            start: start,
            end: end,
            transactionName: transactionName,
            uiFilters: JSON.stringify(uiFilters)
          }
        }
      });
    }
  }, [serviceName, start, end, transactionName, uiFilters]),
      data = _useFetcher.data,
      error = _useFetcher.error,
      status = _useFetcher.status;

  return {
    data: toTimeSeries(data),
    status: status,
    error: error
  };
}