"use strict";

var _react = require("@storybook/react");

var _react2 = _interopRequireDefault(require("react"));

var _tool_tip_shortcut = require("../tool_tip_shortcut");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
(0, _react.storiesOf)('components/ToolTipShortcut', module).addDecorator(function (story) {
  return _react2.default.createElement("div", {
    style: {
      width: '100px',
      backgroundColor: '#343741',
      padding: '5px'
    }
  }, story());
}).add('with shortcut', function () {
  return _react2.default.createElement(_tool_tip_shortcut.ToolTipShortcut, {
    shortcut: "G"
  });
}).add('with cmd', function () {
  return _react2.default.createElement(_tool_tip_shortcut.ToolTipShortcut, {
    shortcut: "\u2318 + D"
  });
}).add('with alt', function () {
  return _react2.default.createElement(_tool_tip_shortcut.ToolTipShortcut, {
    shortcut: "\u2325 + P"
  });
}).add('with left arrow', function () {
  return _react2.default.createElement(_tool_tip_shortcut.ToolTipShortcut, {
    shortcut: "\u2190"
  });
}).add('with right arrow', function () {
  return _react2.default.createElement(_tool_tip_shortcut.ToolTipShortcut, {
    shortcut: "\u2192"
  });
}).add('with up arrow', function () {
  return _react2.default.createElement(_tool_tip_shortcut.ToolTipShortcut, {
    shortcut: "\u2318 + SHIFT + \u2191"
  });
}).add('with down arrow', function () {
  return _react2.default.createElement(_tool_tip_shortcut.ToolTipShortcut, {
    shortcut: "\u2318 + SHIFT + \u2193"
  });
});