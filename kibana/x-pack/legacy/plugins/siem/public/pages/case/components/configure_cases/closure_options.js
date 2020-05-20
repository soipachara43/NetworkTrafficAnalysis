"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClosureOptions = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _closure_options_radio = require("./closure_options_radio");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ClosureOptionsComponent = function ClosureOptionsComponent(_ref) {
  var closureTypeSelected = _ref.closureTypeSelected,
      disabled = _ref.disabled,
      onChangeClosureType = _ref.onChangeClosureType;
  return _react.default.createElement(_eui.EuiDescribedFormGroup, {
    fullWidth: true,
    title: _react.default.createElement("h3", null, i18n.CASE_CLOSURE_OPTIONS_TITLE),
    description: i18n.CASE_CLOSURE_OPTIONS_DESC,
    "data-test-subj": "case-closure-options-form-group"
  }, _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    label: i18n.CASE_CLOSURE_OPTIONS_LABEL,
    "data-test-subj": "case-closure-options-form-row"
  }, _react.default.createElement(_closure_options_radio.ClosureOptionsRadio, {
    closureTypeSelected: closureTypeSelected,
    disabled: disabled,
    onChangeClosureType: onChangeClosureType,
    "data-test-subj": "case-closure-options-radio"
  })));
};

var ClosureOptions = _react.default.memo(ClosureOptionsComponent);

exports.ClosureOptions = ClosureOptions;