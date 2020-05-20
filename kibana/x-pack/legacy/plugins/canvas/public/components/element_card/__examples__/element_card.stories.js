"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _element_card = require("../element_card");

var _elastic_logo = require("../../../lib/elastic_logo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
(0, _react2.storiesOf)('components/Elements/ElementCard', module).addDecorator(function (story) {
  return _react.default.createElement("div", {
    style: {
      width: '210px'
    }
  }, story());
}).add('with title and description', function () {
  return _react.default.createElement(_element_card.ElementCard, {
    title: "Element 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis aliquet arcu ut turpis duis."
  });
}).add('with image', function () {
  return _react.default.createElement(_element_card.ElementCard, {
    title: "Element 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis aliquet arcu ut turpis duis.",
    image: _elastic_logo.elasticLogo
  });
}).add('with tags', function () {
  return _react.default.createElement(_element_card.ElementCard, {
    title: "Element 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis aliquet arcu ut turpis duis.",
    tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6'],
    onClick: (0, _addonActions.action)('onClick')
  });
}).add('with click handler', function () {
  return _react.default.createElement(_element_card.ElementCard, {
    title: "Element 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis aliquet arcu ut turpis duis.",
    onClick: (0, _addonActions.action)('onClick')
  });
});