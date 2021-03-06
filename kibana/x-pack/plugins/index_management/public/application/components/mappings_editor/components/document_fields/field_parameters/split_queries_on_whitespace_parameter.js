"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SplitQueriesOnWhitespaceParameter = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _edit_field = require("../fields/edit_field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SplitQueriesOnWhitespaceParameter = function SplitQueriesOnWhitespaceParameter() {
  return _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.splitQueriesOnWhitespaceFieldTitle', {
      defaultMessage: 'Split queries on whitespace'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.splitQueriesOnWhitespaceDescription', {
      defaultMessage: 'Full text queries will split the input on whitespace when building a query for this field.'
    }),
    formFieldPath: "split_queries_on_whitespace"
  });
};

exports.SplitQueriesOnWhitespaceParameter = SplitQueriesOnWhitespaceParameter;