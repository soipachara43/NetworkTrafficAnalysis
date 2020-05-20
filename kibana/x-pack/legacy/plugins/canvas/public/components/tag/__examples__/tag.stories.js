"use strict";

var _react = require("@storybook/react");

var _react2 = _interopRequireDefault(require("react"));

var _tag = require("../tag");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
(0, _react.storiesOf)('components/Tags/Tag', module).add('as health', function () {
  return _react2.default.createElement(_tag.Tag, {
    name: "tag"
  });
}).add('as health with color', function () {
  return _react2.default.createElement(_tag.Tag, {
    name: "tag",
    color: "#9b3067"
  });
}).add('as badge', function () {
  return _react2.default.createElement(_tag.Tag, {
    name: "tag",
    type: "badge"
  });
}).add('as badge with color', function () {
  return _react2.default.createElement(_tag.Tag, {
    name: "tag",
    type: "badge",
    color: "#327b53"
  });
});