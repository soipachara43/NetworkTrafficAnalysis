"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleTemplate = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _color_picker_popover = require("../../../components/color_picker_popover");

var _i18n = require("../../../../i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var strings = _i18n.ArgTypesStrings.ContainerStyle;

var SimpleTemplate = function SimpleTemplate(_ref) {
  var getArgValue = _ref.getArgValue,
      setArgValue = _ref.setArgValue,
      workpad = _ref.workpad;
  return _react.default.createElement("div", {
    style: {
      fontSize: 0
    }
  }, _react.default.createElement(_color_picker_popover.ColorPickerPopover, {
    value: getArgValue('backgroundColor'),
    onChange: function onChange(color) {
      return setArgValue('backgroundColor', color);
    },
    colors: workpad.colors,
    anchorPosition: "leftCenter",
    ariaLabel: strings.getDisplayName()
  }));
};

exports.SimpleTemplate = SimpleTemplate;
SimpleTemplate.displayName = 'ContainerStyleArgSimpleInput';
SimpleTemplate.propTypes = {
  getArgValue: _propTypes.default.func.isRequired,
  setArgValue: _propTypes.default.func.isRequired,
  workpad: _propTypes.default.shape({
    colors: _propTypes.default.array.isRequired
  })
};