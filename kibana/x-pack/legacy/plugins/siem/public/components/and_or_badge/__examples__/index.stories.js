"use strict";

var _react = require("@storybook/react");

var _react2 = _interopRequireDefault(require("react"));

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
(0, _react.storiesOf)('components/AndOrBadge', module).add('and', function () {
  return _react2.default.createElement(_.AndOrBadge, {
    type: "and"
  });
}).add('or', function () {
  return _react2.default.createElement(_.AndOrBadge, {
    type: "or"
  });
});