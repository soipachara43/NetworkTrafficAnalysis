"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _element_controls = require("../element_controls");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
(0, _react2.storiesOf)('components/Elements/ElementControls', module).addDecorator(function (story) {
  return _react.default.createElement("div", {
    style: {
      width: '50px'
    }
  }, story());
}).add('has two buttons', function () {
  return _react.default.createElement(_element_controls.ElementControls, {
    onDelete: (0, _addonActions.action)('onDelete'),
    onEdit: (0, _addonActions.action)('onEdit')
  });
});