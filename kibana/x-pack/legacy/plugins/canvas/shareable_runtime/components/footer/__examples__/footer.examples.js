"use strict";

var _react = require("@storybook/react");

var _react2 = _interopRequireDefault(require("react"));

var _context_example = require("../../../test/context_example");

var _footer = require("../footer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
(0, _react.storiesOf)('shareables/Footer', module).add('contextual: hello', () => _react2.default.createElement(_context_example.ExampleContext, {
  height: 172,
  source: "hello"
}, _react2.default.createElement(_footer.Footer, null))).add('contextual: austin', () => _react2.default.createElement(_context_example.ExampleContext, {
  height: 172,
  source: "austin"
}, _react2.default.createElement(_footer.Footer, null)));