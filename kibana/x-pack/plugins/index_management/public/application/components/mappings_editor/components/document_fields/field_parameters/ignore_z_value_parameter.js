"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IgnoreZValueParameter = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _edit_field = require("../fields/edit_field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var IgnoreZValueParameter = function IgnoreZValueParameter() {
  return _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.ignoreZValueFieldTitle', {
      defaultMessage: 'Ignore Z value'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.ignoredZValueFieldDescription', {
      defaultMessage: 'Three dimension points will be accepted, but only latitude and longitude values will be indexed; the third dimension is ignored.'
    }),
    formFieldPath: "ignore_z_value"
  });
};

exports.IgnoreZValueParameter = IgnoreZValueParameter;