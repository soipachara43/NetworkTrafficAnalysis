"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyStateError = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EmptyStateError = function EmptyStateError(_ref) {
  var errors = _ref.errors;
  var unauthorized = errors.find(function (error) {
    return error.message && error.message.includes('unauthorized');
  });
  return _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "securityApp",
    iconColor: "subdued",
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "m"
    }, unauthorized ? _react.default.createElement("h3", null, _i18n.i18n.translate('xpack.uptime.emptyStateError.notAuthorized', {
      defaultMessage: 'You are not authorized to view Uptime data, please contact your system administrator.'
    })) : _react.default.createElement("h3", null, _i18n.i18n.translate('xpack.uptime.emptyStateError.title', {
      defaultMessage: 'Error'
    }))),
    body: _react.default.createElement(_react.Fragment, null, !unauthorized && errors.map(function (error) {
      return _react.default.createElement("p", {
        key: error.message
      }, error.message);
    }))
  }))));
};

exports.EmptyStateError = EmptyStateError;