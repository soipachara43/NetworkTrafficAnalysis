"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeQueryParam = removeQueryParam;

var _queryString = require("query-string");

var _common = require("../../common");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function removeQueryParam(history, param) {
  var replace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var oldLocation = history.location;
  var search = (oldLocation.search || '').replace(/^\?/, '');
  var query = (0, _queryString.parse)(search, {
    sort: false
  });
  delete query[param];
  var newSearch = (0, _queryString.stringify)(_common.url.encodeQuery(query), {
    sort: false,
    encode: false
  });

  var newLocation = _objectSpread({}, oldLocation, {
    search: newSearch
  });

  if (replace) {
    history.replace(newLocation);
  } else {
    history.push(newLocation);
  }
}