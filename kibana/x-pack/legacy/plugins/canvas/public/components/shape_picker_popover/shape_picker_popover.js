"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShapePickerPopover = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

var _popover = require("../popover");

var _shape_picker = require("../shape_picker");

var _shape_preview = require("../shape_preview");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ShapePickerPopover = function ShapePickerPopover(_ref) {
  var shapes = _ref.shapes,
      onChange = _ref.onChange,
      value = _ref.value,
      ariaLabel = _ref.ariaLabel;

  var button = function button(handleClick) {
    return _react.default.createElement(_eui.EuiPanel, {
      paddingSize: "s",
      hasShadow: false
    }, _react.default.createElement(_eui.EuiLink, {
      "aria-label": ariaLabel,
      style: {
        fontSize: 0
      },
      onClick: handleClick
    }, _react.default.createElement(_shape_preview.ShapePreview, {
      shape: value ? shapes[value] : undefined
    })));
  };

  return _react.default.createElement(_popover.Popover, {
    panelClassName: "canvas",
    button: button
  }, function () {
    return _react.default.createElement(_shape_picker.ShapePicker, {
      onChange: onChange,
      shapes: shapes
    });
  });
};

exports.ShapePickerPopover = ShapePickerPopover;
ShapePickerPopover.propTypes = {
  shapes: _propTypes.default.object.isRequired,
  value: _propTypes.default.string,
  onChange: _propTypes.default.func
};