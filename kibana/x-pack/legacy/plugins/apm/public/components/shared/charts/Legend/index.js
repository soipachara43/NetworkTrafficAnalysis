"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Legend = exports.Indicator = exports.Shape = void 0;

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _variables = require("../../../../style/variables");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Shape;
exports.Shape = Shape;

(function (Shape) {
  Shape["circle"] = "circle";
  Shape["square"] = "square";
})(Shape || (exports.Shape = Shape = {}));

var Container = _styledComponents.default.div.withConfig({
  displayName: "Container",
  componentId: "ay18rd-0"
})(["display:flex;align-items:center;font-size:", ";color:", ";cursor:", ";opacity:", ";user-select:none;"], function (props) {
  return props.fontSize;
}, _eui_theme_light.default.euiColorDarkShade, function (props) {
  return props.clickable ? 'pointer' : 'initial';
}, function (props) {
  return props.disabled ? 0.4 : 1;
});

var Indicator = _styledComponents.default.span.withConfig({
  displayName: "Indicator",
  componentId: "ay18rd-1"
})(["width:", ";height:", ";margin-right:", ";background:", ";border-radius:", ";"], function (props) {
  return (0, _variables.px)(props.radius);
}, function (props) {
  return (0, _variables.px)(props.radius);
}, function (props) {
  return props.withMargin ? (0, _variables.px)(props.radius / 2) : 0;
}, function (props) {
  return props.color;
}, function (props) {
  return props.shape === Shape.circle ? '100%' : '0';
});

exports.Indicator = Indicator;

var Legend = function Legend(_ref) {
  var onClick = _ref.onClick,
      text = _ref.text,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? _eui_theme_light.default.euiColorVis1 : _ref$color,
      _ref$fontSize = _ref.fontSize,
      fontSize = _ref$fontSize === void 0 ? _variables.fontSizes.small : _ref$fontSize,
      _ref$radius = _ref.radius,
      radius = _ref$radius === void 0 ? _variables.units.minus - 1 : _ref$radius,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      _ref$clickable = _ref.clickable,
      clickable = _ref$clickable === void 0 ? false : _ref$clickable,
      _ref$shape = _ref.shape,
      shape = _ref$shape === void 0 ? Shape.circle : _ref$shape,
      indicator = _ref.indicator,
      rest = _objectWithoutProperties(_ref, ["onClick", "text", "color", "fontSize", "radius", "disabled", "clickable", "shape", "indicator"]);

  return _react.default.createElement(Container, _extends({
    onClick: onClick,
    disabled: disabled,
    clickable: clickable || Boolean(onClick),
    fontSize: fontSize
  }, rest), indicator ? indicator() : _react.default.createElement(Indicator, {
    color: color,
    radius: radius,
    shape: shape,
    withMargin: !!text
  }), text);
};

exports.Legend = Legend;