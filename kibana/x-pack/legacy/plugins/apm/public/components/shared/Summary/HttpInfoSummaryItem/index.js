"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HttpInfoSummaryItem = HttpInfoSummaryItem;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _variables = require("../../../../style/variables");

var _HttpStatusBadge = require("../HttpStatusBadge");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var HttpInfoBadge = (0, _styledComponents.default)(_eui.EuiBadge).withConfig({
  displayName: "HttpInfoBadge",
  componentId: "zm7v59-0"
})(["margin-right:", ";"], (0, _variables.px)(_variables.units.quarter));
var Url = (0, _styledComponents.default)('span').withConfig({
  displayName: "Url",
  componentId: "zm7v59-1"
})(["display:inline-block;vertical-align:bottom;", ";"], (0, _variables.truncate)((0, _variables.px)(_variables.unit * 24)));
var Span = (0, _styledComponents.default)('span').withConfig({
  displayName: "Span",
  componentId: "zm7v59-2"
})(["white-space:nowrap;"]);

function HttpInfoSummaryItem(_ref) {
  var status = _ref.status,
      method = _ref.method,
      url = _ref.url;

  if (!url) {
    return null;
  }

  var methodLabel = _i18n.i18n.translate('xpack.apm.transactionDetails.requestMethodLabel', {
    defaultMessage: 'Request method'
  });

  return _react.default.createElement(Span, null, _react.default.createElement(HttpInfoBadge, {
    title: undefined
  }, method && _react.default.createElement(_eui.EuiToolTip, {
    content: methodLabel
  }, _react.default.createElement(_react.default.Fragment, null, method.toUpperCase())), ' ', _react.default.createElement(_eui.EuiToolTip, {
    content: url
  }, _react.default.createElement(Url, null, url))), status && _react.default.createElement(_HttpStatusBadge.HttpStatusBadge, {
    status: status
  }));
}