"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.templatesFormSchema = void 0;

var _i18n = require("@kbn/i18n");

var _shared_imports = require("../../shared_imports");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var isJsonField = _shared_imports.fieldValidators.isJsonField;
var templatesFormSchema = {
  dynamicTemplates: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.templates.dynamicTemplatesEditorLabel', {
      defaultMessage: 'Dynamic templates data'
    }),
    validations: [{
      validator: isJsonField(_i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.templates.dynamicTemplatesEditorJsonError', {
        defaultMessage: 'The dynamic templates JSON is not valid.'
      }))
    }]
  }
};
exports.templatesFormSchema = templatesFormSchema;