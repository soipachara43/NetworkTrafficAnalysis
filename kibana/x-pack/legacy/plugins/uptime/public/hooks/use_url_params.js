"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUrlParams = void 0;

var _queryString = require("query-string");

var _reactRouterDom = require("react-router-dom");

var _helper = require("../lib/helper");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useUrlParams = function useUrlParams() {
  var location = (0, _reactRouterDom.useLocation)();
  var history = (0, _reactRouterDom.useHistory)();

  var getUrlParams = function getUrlParams() {
    var search;

    if (location) {
      search = location.search;
    }

    var params = search ? (0, _queryString.parse)(search[0] === '?' ? search.slice(1) : search, {
      sort: false
    }) : {};
    return (0, _helper.getSupportedUrlParams)(params);
  };

  var updateUrlParams = function updateUrlParams(updatedParams) {
    if (!history || !location) return;
    var pathname = location.pathname,
        search = location.search;
    var currentParams = (0, _queryString.parse)(search[0] === '?' ? search.slice(1) : search, {
      sort: false
    });

    var mergedParams = _objectSpread({}, currentParams, {}, updatedParams);

    history.push({
      pathname: pathname,
      search: (0, _queryString.stringify)( // drop any parameters that have no value
      Object.keys(mergedParams).reduce(function (params, key) {
        var value = mergedParams[key];

        if (value === undefined || value === '') {
          return params;
        }

        return _objectSpread({}, params, _defineProperty({}, key, value));
      }, {}), {
        sort: false
      })
    });
  };

  return [getUrlParams, updateUrlParams];
};

exports.useUrlParams = useUrlParams;