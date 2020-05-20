"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Step2 = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Step2 = function Step2(props) {
  return _react.default.createElement(_eui.EuiForm, {
    isInvalid: props.showFormErrors
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.monitoring.alerts.configuration.emailAddressLabel', {
      defaultMessage: 'Email address'
    }),
    error: props.formErrors.email,
    isInvalid: props.showFormErrors && !!props.formErrors.email
  }, _react.default.createElement(_eui.EuiFieldText, {
    value: props.emailAddress,
    disabled: props.isDisabled,
    onChange: function onChange(e) {
      return props.setEmailAddress(e.target.value);
    }
  })));
};

exports.Step2 = Step2;