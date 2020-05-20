"use strict";

var _react = require("@storybook/react");

var _react2 = _interopRequireDefault(require("react"));

var _SyncBadge = require("./SyncBadge");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
(0, _react.storiesOf)('app/TransactionDetails/SyncBadge', module).add('sync=true', function () {
  return _react2.default.createElement(_SyncBadge.SyncBadge, {
    sync: true
  });
}, {
  info: {
    source: false
  }
}).add('sync=false', function () {
  return _react2.default.createElement(_SyncBadge.SyncBadge, {
    sync: false
  });
}, {
  info: {
    source: false
  }
}).add('sync=undefined', function () {
  return _react2.default.createElement(_SyncBadge.SyncBadge, null);
}, {
  info: {
    source: false
  }
});