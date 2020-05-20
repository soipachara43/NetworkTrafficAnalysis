"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HttpStatusBadge = HttpStatusBadge;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _statusCodes = require("./statusCodes");

var _httpStatusCodeToColor = require("../../../../utils/httpStatusCodeToColor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function HttpStatusBadge(_ref) {
  var status = _ref.status;

  var label = _i18n.i18n.translate('xpack.apm.transactionDetails.statusCode', {
    defaultMessage: 'Status code'
  });

  return _react.default.createElement(_eui.EuiToolTip, {
    content: label
  }, _react.default.createElement(_eui.EuiBadge, {
    color: (0, _httpStatusCodeToColor.httpStatusCodeToColor)(status) || 'default'
  }, status, " ", _statusCodes.statusCodes[status.toString()]));
}