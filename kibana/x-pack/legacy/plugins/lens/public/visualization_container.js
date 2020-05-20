"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisualizationContainer = VisualizationContainer;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * This is a convenience component that wraps rendered Lens visualizations. It adds reporting
 * attributes (data-shared-item, data-render-complete, and data-title).
 */
function VisualizationContainer(_ref) {
  var _ref$isReady = _ref.isReady,
      isReady = _ref$isReady === void 0 ? true : _ref$isReady,
      reportTitle = _ref.reportTitle,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["isReady", "reportTitle", "children"]);

  return _react.default.createElement("div", _extends({
    "data-shared-item": true,
    "data-render-complete": isReady,
    "data-title": reportTitle
  }, rest), children);
}