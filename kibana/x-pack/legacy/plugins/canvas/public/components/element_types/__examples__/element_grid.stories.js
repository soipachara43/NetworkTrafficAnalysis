"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _element_grid = require("../element_grid");

var _test_elements = require("./fixtures/test_elements");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
(0, _react2.storiesOf)('components/Elements/ElementGrid', module).addDecorator(function (story) {
  return _react.default.createElement("div", {
    style: {
      width: '1000px'
    }
  }, story());
}).add('without controls', function () {
  return _react.default.createElement(_element_grid.ElementGrid, {
    elements: _test_elements.testElements,
    handleClick: (0, _addonActions.action)('addElement')
  });
}).add('with controls', function () {
  return _react.default.createElement(_element_grid.ElementGrid, {
    elements: _test_elements.testCustomElements,
    handleClick: (0, _addonActions.action)('addCustomElement'),
    showControls: true,
    onDelete: (0, _addonActions.action)('onDelete'),
    onEdit: (0, _addonActions.action)('onEdit')
  });
}).add('with text filter', function () {
  return _react.default.createElement(_element_grid.ElementGrid, {
    elements: _test_elements.testElements,
    handleClick: (0, _addonActions.action)('addCustomElement'),
    filterText: "table"
  });
}).add('with tags filter', function () {
  return _react.default.createElement(_element_grid.ElementGrid, {
    elements: _test_elements.testElements,
    handleClick: (0, _addonActions.action)('addCustomElement'),
    filterTags: ['graphic']
  });
}).add('with controls and filter', function () {
  return _react.default.createElement(_element_grid.ElementGrid, {
    elements: _test_elements.testCustomElements,
    handleClick: (0, _addonActions.action)('addCustomElement'),
    filterText: "Lorem",
    showControls: true,
    onDelete: (0, _addonActions.action)('onDelete'),
    onEdit: (0, _addonActions.action)('onEdit')
  });
});