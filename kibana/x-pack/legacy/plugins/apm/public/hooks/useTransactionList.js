"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTransactionList = useTransactionList;

var _react = require("react");

var _UrlParamsContext = require("../context/UrlParamsContext");

var _useFetcher2 = require("./useFetcher");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getRelativeImpact = function getRelativeImpact(impact, impactMin, impactMax) {
  return Math.max((impact - impactMin) / Math.max(impactMax - impactMin, 1) * 100, 1);
};

function getWithRelativeImpact(items) {
  var impacts = items.map(function (_ref) {
    var impact = _ref.impact;
    return impact;
  }).filter(function (impact) {
    return impact !== null;
  });
  var impactMin = Math.min.apply(Math, _toConsumableArray(impacts));
  var impactMax = Math.max.apply(Math, _toConsumableArray(impacts));
  return items.map(function (item) {
    return _objectSpread({}, item, {
      impactRelative: item.impact !== null ? getRelativeImpact(item.impact, impactMin, impactMax) : null
    });
  });
}

function useTransactionList(urlParams) {
  var serviceName = urlParams.serviceName,
      transactionType = urlParams.transactionType,
      start = urlParams.start,
      end = urlParams.end;
  var uiFilters = (0, _UrlParamsContext.useUiFilters)(urlParams);

  var _useFetcher = (0, _useFetcher2.useFetcher)(function (callApmApi) {
    if (serviceName && start && end && transactionType) {
      return callApmApi({
        pathname: '/api/apm/services/{serviceName}/transaction_groups',
        params: {
          path: {
            serviceName: serviceName
          },
          query: {
            start: start,
            end: end,
            transactionType: transactionType,
            uiFilters: JSON.stringify(uiFilters)
          }
        }
      });
    }
  }, [serviceName, start, end, transactionType, uiFilters]),
      _useFetcher$data = _useFetcher.data,
      data = _useFetcher$data === void 0 ? [] : _useFetcher$data,
      error = _useFetcher.error,
      status = _useFetcher.status;

  var memoizedData = (0, _react.useMemo)(function () {
    return getWithRelativeImpact(data);
  }, [data]);
  return {
    data: memoizedData,
    status: status,
    error: error
  };
}