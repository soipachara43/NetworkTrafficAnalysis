"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormRowSelect = FormRowSelect;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _SelectWithPlaceholder = require("../../../../../shared/SelectWithPlaceholder");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function FormRowSelect(_ref) {
  var title = _ref.title,
      description = _ref.description,
      fieldLabel = _ref.fieldLabel,
      isLoading = _ref.isLoading,
      options = _ref.options,
      value = _ref.value,
      disabled = _ref.disabled,
      onChange = _ref.onChange;
  return _react.default.createElement(_eui.EuiDescribedFormGroup, {
    fullWidth: true,
    title: _react.default.createElement("h3", null, title),
    description: description
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: fieldLabel
  }, _react.default.createElement(_SelectWithPlaceholder.SelectWithPlaceholder, {
    isLoading: isLoading,
    options: options,
    value: value,
    disabled: disabled,
    onChange: onChange
  })));
}