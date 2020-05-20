"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columns = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _empty_value = require("../../../../components/empty_value");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable react/display-name */
var actions = [{
  available: function available(item) {
    return item.status === 'Running';
  },
  description: 'Stop',
  icon: 'stop',
  isPrimary: true,
  name: 'Stop',
  onClick: function onClick() {},
  type: 'icon'
}, {
  available: function available(item) {
    return item.status === 'Stopped';
  },
  description: 'Resume',
  icon: 'play',
  isPrimary: true,
  name: 'Resume',
  onClick: function onClick() {},
  type: 'icon'
}]; // Michael: Are we able to do custom, in-table-header filters, as shown in my wireframes?

var columns = [{
  field: 'rule',
  name: 'Rule',
  render: function render(value) {
    return _react.default.createElement(_eui.EuiLink, {
      href: value.href
    }, value.name);
  },
  sortable: true,
  truncateText: true
}, {
  field: 'ran',
  name: 'Ran',
  render: function render(value) {
    return '--';
  },
  sortable: true,
  truncateText: true
}, {
  field: 'lookedBackTo',
  name: 'Looked back to',
  render: function render(value) {
    return '--';
  },
  sortable: true,
  truncateText: true
}, {
  field: 'status',
  name: 'Status',
  sortable: true,
  truncateText: true
}, {
  field: 'response',
  name: 'Response',
  render: function render(value) {
    return value === undefined ? (0, _empty_value.getEmptyTagValue)() : _react.default.createElement(_react.default.Fragment, null, value === 'Fail' ? _react.default.createElement(_eui.EuiTextColor, {
      color: "danger"
    }, value, " ", _react.default.createElement(_eui.EuiIconTip, {
      content: "Full fail message here.",
      type: "iInCircle"
    })) : _react.default.createElement(_eui.EuiTextColor, {
      color: "secondary"
    }, value));
  },
  sortable: true,
  truncateText: true
}, {
  actions: actions,
  width: '40px'
}];
exports.columns = columns;