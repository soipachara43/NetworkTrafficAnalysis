"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FontPicker = void 0;

var _eui = require("@elastic/eui");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _fonts = require("../../../common/lib/fonts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore (elastic/eui#1262) EuiSuperSelect is not exported yet
var FontPicker = function FontPicker(props) {
  var value = props.value,
      onSelect = props.onSelect; // While fonts are strongly-typed, we also support custom fonts someone might type in.
  // So let's cast the fonts and allow for additions.

  var displayedFonts = _fonts.fonts;

  if (value && !_fonts.fonts.find(function (font) {
    return font.value === value;
  })) {
    var label = (value.indexOf(',') >= 0 ? value.split(',')[0] : value).replace(/['"]/g, '');
    displayedFonts.push({
      value: value,
      label: label
    });
    displayedFonts.sort(function (a, b) {
      return a.label.localeCompare(b.label);
    });
  }

  return _react.default.createElement(_eui.EuiSuperSelect, {
    compressed: true,
    options: displayedFonts.map(function (font) {
      return {
        value: font.value,
        inputDisplay: _react.default.createElement("div", {
          style: {
            fontFamily: font.value
          }
        }, font.label)
      };
    }),
    valueOfSelected: value,
    onChange: function onChange(newValue) {
      return onSelect && onSelect(newValue);
    }
  });
};

exports.FontPicker = FontPicker;
FontPicker.propTypes = {
  /** Initial value of the Font Picker. */
  value: _propTypes.default.string,

  /** Function to execute when a Font is selected. */
  onSelect: _propTypes.default.func
};
FontPicker.displayName = 'FontPicker';