"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceMetricFetcher = ServiceMetricFetcher;

var _react = _interopRequireDefault(require("react"));

var _useFetcher2 = require("../../../../hooks/useFetcher");

var _useUrlParams2 = require("../../../../hooks/useUrlParams");

var _ServiceMetricList = require("./ServiceMetricList");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ServiceMetricFetcher(_ref) {
  var frameworkName = _ref.frameworkName,
      serviceName = _ref.serviceName;

  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      _useUrlParams$urlPara = _useUrlParams.urlParams,
      start = _useUrlParams$urlPara.start,
      end = _useUrlParams$urlPara.end,
      environment = _useUrlParams$urlPara.environment;

  var _useFetcher = (0, _useFetcher2.useFetcher)(function (callApmApi) {
    if (serviceName && start && end) {
      return callApmApi({
        pathname: '/api/apm/service-map/service/{serviceName}',
        params: {
          path: {
            serviceName: serviceName
          },
          query: {
            start: start,
            end: end,
            environment: environment
          }
        }
      });
    }
  }, [serviceName, start, end, environment], {
    preservePreviousData: false
  }),
      _useFetcher$data = _useFetcher.data,
      data = _useFetcher$data === void 0 ? {} : _useFetcher$data,
      status = _useFetcher.status;

  var isLoading = status === 'loading';
  return _react.default.createElement(_ServiceMetricList.ServiceMetricList, _extends({}, data, {
    frameworkName: frameworkName,
    isLoading: isLoading
  }));
}