"use strict";

var _react = require("@storybook/react");

var _react2 = _interopRequireDefault(require("react"));

var _addonActions = require("@storybook/addon-actions");

var _keyboard_shortcuts_doc = require("../keyboard_shortcuts_doc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
(0, _react.storiesOf)('components/KeyboardShortcutsDoc', module).add('default', function () {
  return _react2.default.createElement(_keyboard_shortcuts_doc.KeyboardShortcutsDoc, {
    onClose: (0, _addonActions.action)('onClose')
  });
});