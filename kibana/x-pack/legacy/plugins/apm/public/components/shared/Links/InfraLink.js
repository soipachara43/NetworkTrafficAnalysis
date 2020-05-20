"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfraLink = InfraLink;
exports.getInfraHref = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _url = _interopRequireDefault(require("url"));

var _url_helpers = require("./url_helpers");

var _useApmPluginContext2 = require("../../../hooks/useApmPluginContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var getInfraHref = function getInfraHref(_ref) {
  var app = _ref.app,
      basePath = _ref.basePath,
      query = _ref.query,
      path = _ref.path;
  var nextSearch = (0, _url_helpers.fromQuery)(query);
  return _url.default.format({
    pathname: basePath.prepend("/app/".concat(app).concat(path || '')),
    search: nextSearch
  });
};

exports.getInfraHref = getInfraHref;

function InfraLink(_ref2) {
  var app = _ref2.app,
      path = _ref2.path,
      _ref2$query = _ref2.query,
      query = _ref2$query === void 0 ? {} : _ref2$query,
      rest = _objectWithoutProperties(_ref2, ["app", "path", "query"]);

  var _useApmPluginContext = (0, _useApmPluginContext2.useApmPluginContext)(),
      core = _useApmPluginContext.core;

  var href = getInfraHref({
    app: app,
    basePath: core.http.basePath,
    query: query,
    path: path
  });
  return _react.default.createElement(_eui.EuiLink, _extends({}, rest, {
    href: href
  }));
}