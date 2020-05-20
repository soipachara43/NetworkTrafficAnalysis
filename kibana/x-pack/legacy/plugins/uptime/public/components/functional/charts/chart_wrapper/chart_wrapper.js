"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartWrapper = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ChartWrapper = function ChartWrapper(_ref) {
  var _ref$loading = _ref.loading,
      loading = _ref$loading === void 0 ? false : _ref$loading,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? '100%' : _ref$height,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["loading", "height", "children"]);

  var opacity = loading === true ? 0.3 : 1;
  return _react.default.createElement(_eui.EuiErrorBoundary, null, _react.default.createElement("div", _extends({
    style: {
      height: height,
      opacity: opacity,
      transition: 'opacity 0.2s'
    }
  }, rest), children), loading === true && _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceAround",
    alignItems: "center",
    style: {
      height: height,
      marginTop: "-".concat(height),
      marginBottom: 0
    }
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiLoadingChart, {
    size: "xl"
  }))));
};

exports.ChartWrapper = ChartWrapper;