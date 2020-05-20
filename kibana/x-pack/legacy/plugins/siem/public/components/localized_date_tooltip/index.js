"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalizedDateTooltip = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _moment = _interopRequireDefault(require("moment"));

var _react2 = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LocalizedDateTooltip = _react2.default.memo(function (_ref) {
  var children = _ref.children,
      date = _ref.date,
      fieldName = _ref.fieldName;
  return _react2.default.createElement(_eui.EuiToolTip, {
    "data-test-subj": "localized-date-tool-tip",
    content: _react2.default.createElement(_eui.EuiFlexGroup, {
      "data-test-subj": "dates-container",
      direction: "column",
      gutterSize: "none"
    }, fieldName != null ? _react2.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react2.default.createElement("span", {
      "data-test-subj": "field-name"
    }, fieldName)) : null, _react2.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react2.default.createElement(_react.FormattedRelative, {
      "data-test-subj": "humanized-relative-date",
      value: _moment.default.utc(date).toDate()
    })), _react2.default.createElement(_eui.EuiFlexItem, {
      "data-test-subj": "with-day-of-week",
      grow: false
    }, _moment.default.utc(date).local().format('llll')), _react2.default.createElement(_eui.EuiFlexItem, {
      "data-test-subj": "with-time-zone-offset-in-hours",
      grow: false
    }, (0, _moment.default)(date).format()))
  }, _react2.default.createElement(_react2.default.Fragment, null, children));
});

exports.LocalizedDateTooltip = LocalizedDateTooltip;
LocalizedDateTooltip.displayName = 'LocalizedDateTooltip';