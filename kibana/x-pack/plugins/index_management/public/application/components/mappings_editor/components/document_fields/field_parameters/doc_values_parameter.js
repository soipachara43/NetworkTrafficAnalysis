"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocValuesParameter = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _edit_field = require("../fields/edit_field");

var _documentation = require("../../../../../services/documentation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DocValuesParameter = function DocValuesParameter(_ref) {
  var _ref$configPath = _ref.configPath,
      configPath = _ref$configPath === void 0 ? 'doc_values' : _ref$configPath;
  return _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.docValuesFieldTitle', {
      defaultMessage: 'Use doc values'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.docValuesFieldDescription', {
      defaultMessage: "Store each document's value for this field in memory so it can be used for sorting, aggregations, and in scripts."
    }),
    docLink: {
      text: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.docValuesDocLinkText', {
        defaultMessage: 'Doc values documentation'
      }),
      href: _documentation.documentationService.getDocValuesLink()
    },
    formFieldPath: "doc_values",
    configPath: configPath
  });
};

exports.DocValuesParameter = DocValuesParameter;