"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElasticDocsLink = ElasticDocsLink;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _useApmPluginContext = require("../../../hooks/useApmPluginContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ElasticDocsLink(_ref) {
  var section = _ref.section,
      path = _ref.path,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["section", "path", "children"]);

  var docLinks = (0, _useApmPluginContext.useApmPluginContext)().core.docLinks;
  var baseUrl = docLinks.ELASTIC_WEBSITE_URL;
  var version = docLinks.DOC_LINK_VERSION;
  var href = "".concat(baseUrl, "guide/en").concat(section, "/").concat(version).concat(path);
  return typeof children === 'function' ? children(href) : _react.default.createElement(_eui.EuiLink, _extends({
    href: href
  }, rest), children);
}