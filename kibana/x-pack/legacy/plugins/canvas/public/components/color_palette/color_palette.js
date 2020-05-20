"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorPalette = void 0;

var _eui = require("@elastic/eui");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _tinycolor = _interopRequireDefault(require("tinycolor2"));

var _readable_color = require("../../lib/readable_color");

var _color_dot = require("../color_dot");

var _item_grid = require("../item_grid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ColorPalette = function ColorPalette(_ref) {
  var _ref$colors = _ref.colors,
      colors = _ref$colors === void 0 ? [] : _ref$colors,
      _ref$colorsPerRow = _ref.colorsPerRow,
      colorsPerRow = _ref$colorsPerRow === void 0 ? 6 : _ref$colorsPerRow,
      onChange = _ref.onChange,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? '' : _ref$value;

  if (colors.length === 0) {
    return null;
  }

  colors = colors.filter(function (color) {
    return (0, _tinycolor.default)(color).isValid();
  });
  return _react.default.createElement("div", {
    className: "canvasColorPalette"
  }, _react.default.createElement(_item_grid.ItemGrid, {
    items: colors,
    itemsPerRow: colorsPerRow
  }, function (color) {
    var match = _tinycolor.default.equals(color, value);

    var icon = match ? _react.default.createElement(_eui.EuiIcon, {
      type: "check",
      className: "selected-color",
      color: (0, _readable_color.readableColor)(value)
    }) : null;
    return _react.default.createElement(_eui.EuiLink, {
      style: {
        fontSize: 0
      },
      key: color,
      onClick: function onClick() {
        return !match && onChange(color);
      },
      className: "canvasColorPalette__dot",
      "aria-label": (0, _tinycolor.default)(color).toName() || color
    }, _react.default.createElement(_color_dot.ColorDot, {
      value: color
    }, icon));
  }));
};

exports.ColorPalette = ColorPalette;
ColorPalette.propTypes = {
  colors: _propTypes.default.array,
  colorsPerRow: _propTypes.default.number,
  onChange: _propTypes.default.func.isRequired,
  value: _propTypes.default.string
};