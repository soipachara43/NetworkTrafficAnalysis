"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveUrlParams = resolveUrlParams;

var _helpers = require("./helpers");

var _url_helpers = require("../../components/shared/Links/url_helpers");

var _constants = require("./constants");

var _config = require("../../../../../../plugins/apm/server/lib/ui_filters/local_ui_filters/config");

var _pickKeys = require("../../utils/pickKeys");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function resolveUrlParams(location, state) {
  var _getPathParams = (0, _helpers.getPathParams)(location.pathname),
      processorEvent = _getPathParams.processorEvent,
      serviceName = _getPathParams.serviceName,
      serviceNodeName = _getPathParams.serviceNodeName,
      errorGroupId = _getPathParams.errorGroupId,
      traceIdLink = _getPathParams.traceId;

  var query = (0, _url_helpers.toQuery)(location.search);
  var traceId = query.traceId,
      transactionId = query.transactionId,
      transactionName = query.transactionName,
      transactionType = query.transactionType,
      detailTab = query.detailTab,
      flyoutDetailTab = query.flyoutDetailTab,
      waterfallItemId = query.waterfallItemId,
      spanId = query.spanId,
      page = query.page,
      pageSize = query.pageSize,
      sortDirection = query.sortDirection,
      sortField = query.sortField,
      kuery = query.kuery,
      _query$refreshPaused = query.refreshPaused,
      refreshPaused = _query$refreshPaused === void 0 ? _constants.TIMEPICKER_DEFAULTS.refreshPaused : _query$refreshPaused,
      _query$refreshInterva = query.refreshInterval,
      refreshInterval = _query$refreshInterva === void 0 ? _constants.TIMEPICKER_DEFAULTS.refreshInterval : _query$refreshInterva,
      _query$rangeFrom = query.rangeFrom,
      rangeFrom = _query$rangeFrom === void 0 ? _constants.TIMEPICKER_DEFAULTS.rangeFrom : _query$rangeFrom,
      _query$rangeTo = query.rangeTo,
      rangeTo = _query$rangeTo === void 0 ? _constants.TIMEPICKER_DEFAULTS.rangeTo : _query$rangeTo,
      environment = query.environment,
      searchTerm = query.searchTerm;

  var localUIFilters = _pickKeys.pickKeys.apply(void 0, [query].concat(_toConsumableArray(_config.localUIFilterNames)));

  return (0, _helpers.removeUndefinedProps)(_objectSpread({
    // date params
    start: (0, _helpers.getStart)(state, rangeFrom),
    end: (0, _helpers.getEnd)(state, rangeTo),
    rangeFrom: rangeFrom,
    rangeTo: rangeTo,
    refreshPaused: (0, _helpers.toBoolean)(refreshPaused),
    refreshInterval: (0, _helpers.toNumber)(refreshInterval),
    // query params
    sortDirection: sortDirection,
    sortField: sortField,
    page: (0, _helpers.toNumber)(page) || 0,
    pageSize: pageSize ? (0, _helpers.toNumber)(pageSize) : undefined,
    transactionId: (0, _helpers.toString)(transactionId),
    traceId: (0, _helpers.toString)(traceId),
    waterfallItemId: (0, _helpers.toString)(waterfallItemId),
    detailTab: (0, _helpers.toString)(detailTab),
    flyoutDetailTab: (0, _helpers.toString)(flyoutDetailTab),
    spanId: (0, _helpers.toNumber)(spanId),
    kuery: kuery && decodeURIComponent(kuery),
    transactionName: transactionName,
    transactionType: transactionType,
    searchTerm: (0, _helpers.toString)(searchTerm),
    // path params
    processorEvent: processorEvent,
    serviceName: serviceName,
    traceIdLink: traceIdLink,
    errorGroupId: errorGroupId,
    serviceNodeName: serviceNodeName ? decodeURIComponent(serviceNodeName) : serviceNodeName,
    // ui filters
    environment: environment
  }, localUIFilters));
}