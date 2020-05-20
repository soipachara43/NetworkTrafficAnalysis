"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callClient = callClient;

var _handle_response = require("./handle_response");

var _search_strategy = require("../search_strategy");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function callClient(searchRequests) {
  var requestsOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var fetchHandlers = arguments.length > 2 ? arguments[2] : undefined;
  // Correlate the options with the request that they're associated with
  var requestOptionEntries = searchRequests.map(function (request, i) {
    return [request, requestsOptions[i]];
  });
  var requestOptionsMap = new Map(requestOptionEntries);
  var requestResponseMap = new Map();

  var _defaultSearchStrateg = _search_strategy.defaultSearchStrategy.search(_objectSpread({
    searchRequests: searchRequests
  }, fetchHandlers)),
      searching = _defaultSearchStrateg.searching,
      abort = _defaultSearchStrateg.abort;

  searchRequests.forEach(function (request, i) {
    var response = searching.then(function (results) {
      return (0, _handle_response.handleResponse)(request, results[i]);
    });

    var _ref = requestOptionsMap.get(request) || {},
        _ref$abortSignal = _ref.abortSignal,
        abortSignal = _ref$abortSignal === void 0 ? null : _ref$abortSignal;

    if (abortSignal) abortSignal.addEventListener('abort', abort);
    requestResponseMap.set(request, response);
  });
  return searchRequests.map(function (request) {
    return requestResponseMap.get(request);
  });
}