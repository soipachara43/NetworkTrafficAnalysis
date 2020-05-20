"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAPMHref = getAPMHref;
exports.APMLink = APMLink;
exports.PERSISTENT_APM_PARAMS = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _url = _interopRequireDefault(require("url"));

var _lodash = require("lodash");

var _useLocation2 = require("../../../../hooks/useLocation");

var _url_helpers = require("../url_helpers");

var _constants = require("../../../../context/UrlParamsContext/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PERSISTENT_APM_PARAMS = ['kuery', 'rangeFrom', 'rangeTo', 'refreshPaused', 'refreshInterval', 'environment'];
exports.PERSISTENT_APM_PARAMS = PERSISTENT_APM_PARAMS;

function getAPMHref(path, currentSearch) {
  var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var currentQuery = (0, _url_helpers.toQuery)(currentSearch);

  var nextQuery = _objectSpread({}, _constants.TIMEPICKER_DEFAULTS, {}, (0, _lodash.pick)(currentQuery, PERSISTENT_APM_PARAMS), {}, query);

  var nextSearch = (0, _url_helpers.fromQuery)(nextQuery);
  return _url.default.format({
    pathname: '',
    hash: "".concat(path, "?").concat(nextSearch)
  });
}

function APMLink(_ref) {
  var _ref$path = _ref.path,
      path = _ref$path === void 0 ? '' : _ref$path,
      query = _ref.query,
      rest = _objectWithoutProperties(_ref, ["path", "query"]);

  var _useLocation = (0, _useLocation2.useLocation)(),
      search = _useLocation.search;

  var href = getAPMHref(path, search, query);
  return _react.default.createElement(_eui.EuiLink, _extends({}, rest, {
    href: href
  }));
}