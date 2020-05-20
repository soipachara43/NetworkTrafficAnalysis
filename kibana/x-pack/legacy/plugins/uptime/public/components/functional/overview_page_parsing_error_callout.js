"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverviewPageParsingErrorCallout = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var OverviewPageParsingErrorCallout = function OverviewPageParsingErrorCallout(_ref) {
  var error = _ref.error;
  return _react2.default.createElement(_eui.EuiCallOut, {
    title: _i18n.i18n.translate('xpack.uptime.overviewPageParsingErrorCallout.title', {
      defaultMessage: 'Parsing error'
    }),
    color: "danger",
    iconType: "alert",
    style: {
      width: '100%'
    }
  }, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.uptime.overviewPageParsingErrorCallout.content",
    defaultMessage: "There was an error parsing the filter query. {content}",
    values: {
      content: _react2.default.createElement(_eui.EuiCodeBlock, null, error.message ? error.message : _i18n.i18n.translate('xpack.uptime.overviewPageParsingErrorCallout.noMessage', {
        defaultMessage: 'There was no error message'
      }))
    }
  })));
};

exports.OverviewPageParsingErrorCallout = OverviewPageParsingErrorCallout;