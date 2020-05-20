"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShapePicker = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

var _shape_preview = require("../shape_preview");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ShapePicker = function ShapePicker(_ref) {
  var shapes = _ref.shapes,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange;
  return _react.default.createElement(_eui.EuiFlexGrid, {
    gutterSize: "s",
    columns: 4,
    className: "canvasShapePicker"
  }, Object.keys(shapes).sort().map(function (shapeKey) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      key: shapeKey
    }, _react.default.createElement(_eui.EuiLink, {
      onClick: function onClick() {
        return onChange(shapeKey);
      }
    }, _react.default.createElement(_shape_preview.ShapePreview, {
      shape: shapes[shapeKey]
    })));
  }));
};

exports.ShapePicker = ShapePicker;
ShapePicker.propTypes = {
  shapes: _propTypes.default.object.isRequired,
  onChange: _propTypes.default.func
};