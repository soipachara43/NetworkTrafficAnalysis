"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorPicker = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _tinycolor = _interopRequireDefault(require("tinycolor2"));

var _color_manager = require("../color_manager");

var _color_palette = require("../color_palette");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ColorPicker = function ColorPicker(_ref) {
  var _ref$colors = _ref.colors,
      colors = _ref$colors === void 0 ? [] : _ref$colors,
      _ref$hasButtons = _ref.hasButtons,
      hasButtons = _ref$hasButtons === void 0 ? false : _ref$hasButtons,
      onAddColor = _ref.onAddColor,
      onChange = _ref.onChange,
      onRemoveColor = _ref.onRemoveColor,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? '' : _ref$value;
  var tc = (0, _tinycolor.default)(value);
  var isValidColor = tc.isValid();
  colors = colors.filter(function (color) {
    return (0, _tinycolor.default)(color).isValid();
  });
  var canRemove = false;
  var canAdd = false;

  if (isValidColor) {
    var match = colors.filter(function (color) {
      return _tinycolor.default.equals(value, color);
    });
    canRemove = match.length > 0;
    canAdd = match.length === 0;
  }

  return _react.default.createElement("div", null, _react.default.createElement(_color_palette.ColorPalette, {
    onChange: onChange,
    value: value,
    colors: colors
  }), _react.default.createElement(_color_manager.ColorManager, {
    onChange: onChange,
    value: value,
    onAddColor: canAdd ? onAddColor : undefined,
    onRemoveColor: canRemove ? onRemoveColor : undefined,
    hasButtons: hasButtons
  }));
};

exports.ColorPicker = ColorPicker;
ColorPicker.propTypes = {
  colors: _propTypes.default.array,
  hasButtons: _propTypes.default.bool,
  onAddColor: _propTypes.default.func,
  onChange: _propTypes.default.func.isRequired,
  onRemoveColor: _propTypes.default.func,
  value: _propTypes.default.string
};