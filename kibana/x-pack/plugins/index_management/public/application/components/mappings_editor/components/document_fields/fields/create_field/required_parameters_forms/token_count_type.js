"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TokenCountTypeRequiredParameters = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _field_parameters = require("../../../field_parameters");

var _constants = require("../../../../../constants");

var _shared_imports = require("../../../../../shared_imports");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TokenCountTypeRequiredParameters = function TokenCountTypeRequiredParameters() {
  return _react.default.createElement(_shared_imports.FormRow, {
    title: _react.default.createElement("h3", null, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.tokenCount.analyzerFieldTitle', {
      defaultMessage: 'Analyzer'
    })),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.tokenCount.analyzerFieldDescription', {
      defaultMessage: 'The analyzer which should be used to analyze the string value. For best performance, use an analyzer without token filters.'
    })
  }, _react.default.createElement(_field_parameters.AnalyzerParameter, {
    path: "analyzer",
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.tokenCountRequired.analyzerFieldLabel', {
      defaultMessage: 'Index analyzer'
    }),
    defaultValue: _constants.STANDARD,
    allowsIndexDefaultOption: false
  }));
};

exports.TokenCountTypeRequiredParameters = TokenCountTypeRequiredParameters;