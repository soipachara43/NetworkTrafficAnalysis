"use strict";

var _addonActions = require("@storybook/addon-actions");

var _react = require("@storybook/react");

var _react2 = _interopRequireDefault(require("react"));

var _fonts = require("../../../common/lib/fonts");

var _font_picker = require("./font_picker");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
(0, _react.storiesOf)('components/FontPicker', module).add('default', function () {
  return _react2.default.createElement(_font_picker.FontPicker, {
    onSelect: (0, _addonActions.action)('onSelect')
  });
}).add('with value', function () {
  return _react2.default.createElement(_font_picker.FontPicker, {
    onSelect: (0, _addonActions.action)('onSelect'),
    value: _fonts.americanTypewriter.value
  });
});