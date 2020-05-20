"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscoverLink = DiscoverLink;
exports.getDiscoverHref = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _url = _interopRequireDefault(require("url"));

var _risonNode = _interopRequireDefault(require("rison-node"));

var _useLocation = require("../../../../hooks/useLocation");

var _rison_helpers = require("../rison_helpers");

var _index_pattern_constants = require("../../../../../../../../plugins/apm/common/index_pattern_constants");

var _useApmPluginContext2 = require("../../../../hooks/useApmPluginContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getDiscoverHref = function getDiscoverHref(_ref) {
  var basePath = _ref.basePath,
      location = _ref.location,
      query = _ref.query;
  var risonQuery = {
    _g: (0, _rison_helpers.getTimepickerRisonData)(location.search),
    _a: _objectSpread({}, query._a, {
      index: _index_pattern_constants.APM_STATIC_INDEX_PATTERN_ID
    })
  };

  var href = _url.default.format({
    pathname: basePath.prepend('/app/kibana'),
    hash: "/discover?_g=".concat(_risonNode.default.encode(risonQuery._g), "&_a=").concat(_risonNode.default.encode(risonQuery._a))
  });

  return href;
};

exports.getDiscoverHref = getDiscoverHref;

function DiscoverLink(_ref2) {
  var _ref2$query = _ref2.query,
      query = _ref2$query === void 0 ? {} : _ref2$query,
      rest = _objectWithoutProperties(_ref2, ["query"]);

  var _useApmPluginContext = (0, _useApmPluginContext2.useApmPluginContext)(),
      core = _useApmPluginContext.core;

  var location = (0, _useLocation.useLocation)();
  var href = getDiscoverHref({
    basePath: core.http.basePath,
    query: query,
    location: location
  });
  return _react.default.createElement(_eui.EuiLink, _extends({}, rest, {
    href: href
  }));
}