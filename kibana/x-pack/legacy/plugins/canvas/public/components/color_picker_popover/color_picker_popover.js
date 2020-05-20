"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorPickerPopover = void 0;

var _eui = require("@elastic/eui");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _tinycolor = _interopRequireDefault(require("tinycolor2"));

var _color_dot = require("../color_dot");

var _color_picker = require("../color_picker");

var _popover = require("../popover");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ColorPickerPopover = function ColorPickerPopover(props) {
  var value = props.value,
      anchorPosition = props.anchorPosition,
      ariaLabel = props.ariaLabel,
      rest = _objectWithoutProperties(props, ["value", "anchorPosition", "ariaLabel"]);

  var button = function button(handleClick) {
    return _react.default.createElement(_eui.EuiLink, {
      "aria-label": "".concat(ariaLabel, " ").concat((0, _tinycolor.default)(value).toName() || value),
      style: {
        fontSize: 0
      },
      onClick: handleClick
    }, _react.default.createElement(_color_dot.ColorDot, {
      value: value
    }));
  };

  return _react.default.createElement(_popover.Popover, {
    id: "color-picker-popover",
    panelClassName: "canvas canvasColorPickerPopover__popover",
    button: button,
    anchorPosition: anchorPosition
  }, function () {
    return _react.default.createElement(_color_picker.ColorPicker, _extends({
      value: value
    }, rest));
  });
};

exports.ColorPickerPopover = ColorPickerPopover;
ColorPickerPopover.propTypes = _objectSpread({}, _color_picker.ColorPicker.propTypes, {
  anchorPosition: _propTypes.default.string
});