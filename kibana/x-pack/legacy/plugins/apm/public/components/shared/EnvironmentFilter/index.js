"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnvironmentFilter = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _useFetcher2 = require("../../../hooks/useFetcher");

var _useLocation = require("../../../hooks/useLocation");

var _useUrlParams2 = require("../../../hooks/useUrlParams");

var _history = require("../../../utils/history");

var _url_helpers = require("../Links/url_helpers");

var _environment_filter_values = require("../../../../../../../plugins/apm/common/environment_filter_values");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function updateEnvironmentUrl(location, environment) {
  var nextEnvironmentQueryParam = environment !== _environment_filter_values.ENVIRONMENT_ALL ? environment : undefined;

  _history.history.push(_objectSpread({}, location, {
    search: (0, _url_helpers.fromQuery)(_objectSpread({}, (0, _url_helpers.toQuery)(location.search), {
      environment: nextEnvironmentQueryParam
    }))
  }));
}

var ALL_OPTION = {
  value: _environment_filter_values.ENVIRONMENT_ALL,
  text: _i18n.i18n.translate('xpack.apm.filter.environment.allLabel', {
    defaultMessage: 'All'
  })
};
var NOT_DEFINED_OPTION = {
  value: _environment_filter_values.ENVIRONMENT_NOT_DEFINED,
  text: _i18n.i18n.translate('xpack.apm.filter.environment.notDefinedLabel', {
    defaultMessage: 'Not defined'
  })
};
var SEPARATOR_OPTION = {
  text: "- ".concat(_i18n.i18n.translate('xpack.apm.filter.environment.selectEnvironmentLabel', {
    defaultMessage: 'Select environment'
  }), " -"),
  disabled: true
};

function getOptions(environments) {
  var environmentOptions = environments.filter(function (env) {
    return env !== _environment_filter_values.ENVIRONMENT_NOT_DEFINED;
  }).map(function (environment) {
    return {
      value: environment,
      text: environment
    };
  });
  return [ALL_OPTION].concat(_toConsumableArray(environments.includes(_environment_filter_values.ENVIRONMENT_NOT_DEFINED) ? [NOT_DEFINED_OPTION] : []), _toConsumableArray(environmentOptions.length > 0 ? [SEPARATOR_OPTION] : []), _toConsumableArray(environmentOptions));
}

var EnvironmentFilter = function EnvironmentFilter() {
  var location = (0, _useLocation.useLocation)();

  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      urlParams = _useUrlParams.urlParams,
      uiFilters = _useUrlParams.uiFilters;

  var start = urlParams.start,
      end = urlParams.end,
      serviceName = urlParams.serviceName;
  var environment = uiFilters.environment;

  var _useFetcher = (0, _useFetcher2.useFetcher)(function (callApmApi) {
    if (start && end) {
      return callApmApi({
        pathname: '/api/apm/ui_filters/environments',
        params: {
          query: {
            start: start,
            end: end,
            serviceName: serviceName
          }
        }
      });
    }
  }, [start, end, serviceName]),
      _useFetcher$data = _useFetcher.data,
      environments = _useFetcher$data === void 0 ? [] : _useFetcher$data,
      _useFetcher$status = _useFetcher.status,
      status = _useFetcher$status === void 0 ? 'loading' : _useFetcher$status;

  return _react.default.createElement(_eui.EuiSelect, {
    prepend: _i18n.i18n.translate('xpack.apm.filter.environment.label', {
      defaultMessage: 'environment'
    }),
    options: getOptions(environments),
    value: environment || _environment_filter_values.ENVIRONMENT_ALL,
    onChange: function onChange(event) {
      updateEnvironmentUrl(location, event.target.value);
    },
    isLoading: status === 'loading'
  });
};

exports.EnvironmentFilter = EnvironmentFilter;