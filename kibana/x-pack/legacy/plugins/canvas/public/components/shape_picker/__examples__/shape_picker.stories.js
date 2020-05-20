"use strict";

var _addonActions = require("@storybook/addon-actions");

var _react = require("@storybook/react");

var _react2 = _interopRequireDefault(require("react"));

var _shape_picker = require("../shape_picker");

var _shapes = require("../../../../canvas_plugin_src/renderers/shape/shapes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
(0, _react.storiesOf)('components/Shapes/ShapePicker', module).add('default', function () {
  return _react2.default.createElement(_shape_picker.ShapePicker, {
    shapes: _shapes.shapes,
    onChange: (0, _addonActions.action)('onChange')
  });
});