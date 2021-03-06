"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DenseVectorType = void 0;

var _react = _interopRequireDefault(require("react"));

var _edit_field = require("../edit_field");

var _shared_imports = require("../../../../shared_imports");

var _lib = require("../../../../lib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DenseVectorType = function DenseVectorType() {
  return _react.default.createElement(_edit_field.BasicParametersSection, null, _react.default.createElement(_shared_imports.UseField, {
    path: "dims",
    config: (0, _lib.getFieldConfig)('dims'),
    component: _shared_imports.Field
  }));
};

exports.DenseVectorType = DenseVectorType;