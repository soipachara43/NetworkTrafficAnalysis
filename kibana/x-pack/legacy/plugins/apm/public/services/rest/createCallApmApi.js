"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCallApmApi = createCallApmApi;
exports.callApmApi = void 0;

var _callApi = require("./callApi");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var callApmApi = function callApmApi() {
  throw new Error('callApmApi has to be initialized before used. Call createCallApmApi first.');
};

exports.callApmApi = callApmApi;

function createCallApmApi(http) {
  exports.callApmApi = callApmApi = function callApmApi(options) {
    var pathname = options.pathname,
        _options$params = options.params,
        params = _options$params === void 0 ? {} : _options$params,
        opts = _objectWithoutProperties(options, ["pathname", "params"]);

    var path = params.path || {};
    var formattedPathname = Object.keys(path).reduce(function (acc, paramName) {
      return acc.replace("{".concat(paramName, "}"), path[paramName]);
    }, pathname);
    return (0, _callApi.callApi)(http, _objectSpread({}, opts, {
      pathname: formattedPathname,
      body: params.body,
      query: params.query
    }));
  };
}