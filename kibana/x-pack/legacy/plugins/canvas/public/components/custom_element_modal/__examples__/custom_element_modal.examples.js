"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _custom_element_modal = require("../custom_element_modal");

var _elastic_logo = require("../../../lib/elastic_logo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
(0, _react2.storiesOf)('components/Elements/CustomElementModal', module).add('with title', function () {
  return _react.default.createElement(_custom_element_modal.CustomElementModal, {
    title: "Create new element",
    onCancel: (0, _addonActions.action)('onCancel'),
    onSave: (0, _addonActions.action)('onSave')
  });
}).add('with name', function () {
  return _react.default.createElement(_custom_element_modal.CustomElementModal, {
    title: "Edit custom element",
    name: "My Chart",
    description: "",
    onCancel: (0, _addonActions.action)('onCancel'),
    onSave: (0, _addonActions.action)('onSave')
  });
}).add('with description', function () {
  return _react.default.createElement(_custom_element_modal.CustomElementModal, {
    title: "Edit custom element",
    description: "best element ever",
    onCancel: (0, _addonActions.action)('onCancel'),
    onSave: (0, _addonActions.action)('onSave')
  });
}).add('with image', function () {
  return _react.default.createElement(_custom_element_modal.CustomElementModal, {
    title: "Edit custom element",
    image: _elastic_logo.elasticLogo,
    onCancel: (0, _addonActions.action)('onCancel'),
    onSave: (0, _addonActions.action)('onSave')
  });
});