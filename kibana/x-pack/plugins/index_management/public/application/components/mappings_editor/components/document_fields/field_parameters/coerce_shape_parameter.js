"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CoerceShapeParameter = void 0;

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
var CoerceShapeParameter = function CoerceShapeParameter() {
  return _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.coerceShapeFieldTitle', {
      defaultMessage: 'Coerce to shape'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.coerceShapeDescription', {
      defaultMessage: 'If disabled, then documents that contain polygons with unclosed linear rings are rejected.'
    }),
    docLink: {
      text: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.coerceShapeDocLinkText', {
        defaultMessage: 'Coerce documentation'
      }),
      href: _documentation.documentationService.getCoerceLink()
    },
    formFieldPath: "coerce",
    configPath: "coerce_shape"
  });
};

exports.CoerceShapeParameter = CoerceShapeParameter;