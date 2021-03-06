"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkpadColorPicker = void 0;

var _react = _interopRequireDefault(require("react"));

var _color_picker_popover = require("../color_picker_popover");

var _i18n = require("../../../i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var strings = _i18n.ComponentStrings.WorkpadConfig;

var WorkpadColorPicker = function WorkpadColorPicker(props) {
  return _react.default.createElement(_color_picker_popover.ColorPickerPopover, _extends({}, props, {
    hasButtons: true,
    ariaLabel: strings.getBackgroundColorLabel()
  }));
};

exports.WorkpadColorPicker = WorkpadColorPicker;
WorkpadColorPicker.propTypes = _color_picker_popover.ColorPickerPopover.propTypes;