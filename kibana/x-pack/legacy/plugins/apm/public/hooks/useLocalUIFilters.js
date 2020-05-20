"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLocalUIFilters = useLocalUIFilters;

var _lodash = require("lodash");

var _useFetcher2 = require("./useFetcher");

var _useUrlParams2 = require("./useUrlParams");

var _config = require("../../../../../plugins/apm/server/lib/ui_filters/local_ui_filters/config");

var _history = require("../utils/history");

var _url_helpers = require("../components/shared/Links/url_helpers");

var _helpers = require("../context/UrlParamsContext/helpers");

var _pickKeys = require("../utils/pickKeys");

var _useCallApi = require("./useCallApi");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getInitialData = function getInitialData(filterNames) {
  return filterNames.map(function (filterName) {
    return _objectSpread({
      options: []
    }, _config.localUIFilters[filterName]);
  });
};

function useLocalUIFilters(_ref) {
  var projection = _ref.projection,
      filterNames = _ref.filterNames,
      params = _ref.params;

  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      uiFilters = _useUrlParams.uiFilters,
      urlParams = _useUrlParams.urlParams;

  var callApi = (0, _useCallApi.useCallApi)();

  var values = _pickKeys.pickKeys.apply(void 0, [uiFilters].concat(_toConsumableArray(filterNames)));

  var setFilterValue = function setFilterValue(name, value) {
    var search = (0, _lodash.omit)((0, _url_helpers.toQuery)(_history.history.location.search), name);

    _history.history.push(_objectSpread({}, _history.history.location, {
      search: (0, _url_helpers.fromQuery)((0, _helpers.removeUndefinedProps)(_objectSpread({}, search, _defineProperty({}, name, value.length ? value.join(',') : undefined))))
    }));
  };

  var clearValues = function clearValues() {
    var search = (0, _lodash.omit)((0, _url_helpers.toQuery)(_history.history.location.search), filterNames);

    _history.history.push(_objectSpread({}, _history.history.location, {
      search: (0, _url_helpers.fromQuery)(search)
    }));
  };

  var _useFetcher = (0, _useFetcher2.useFetcher)(function () {
    return callApi({
      method: 'GET',
      pathname: "/api/apm/ui_filters/local_filters/".concat(projection),
      query: _objectSpread({
        uiFilters: JSON.stringify(uiFilters),
        start: urlParams.start,
        end: urlParams.end,
        filterNames: JSON.stringify(filterNames)
      }, params)
    });
  }, [callApi, projection, uiFilters, urlParams.start, urlParams.end, filterNames, params]),
      _useFetcher$data = _useFetcher.data,
      data = _useFetcher$data === void 0 ? getInitialData(filterNames) : _useFetcher$data,
      status = _useFetcher.status;

  var filters = data.map(function (filter) {
    return _objectSpread({}, filter, {
      value: values[filter.name] || []
    });
  });
  return {
    filters: filters,
    status: status,
    setFilterValue: setFilterValue,
    clearValues: clearValues
  };
}