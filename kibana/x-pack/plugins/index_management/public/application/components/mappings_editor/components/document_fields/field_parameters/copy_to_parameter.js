"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CopyToParameter = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _edit_field = require("../fields/edit_field");

var _lib = require("../../../lib");

var _shared_imports = require("../../../shared_imports");

var _documentation = require("../../../../../services/documentation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CopyToParameter = function CopyToParameter(_ref) {
  var defaultToggleValue = _ref.defaultToggleValue;
  return _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.copyToFieldTitle', {
      defaultMessage: 'Copy to group field'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.copyToFieldDescription', {
      defaultMessage: 'Copy the values of multiple fields into a group field. This group field can then be queried as a single field.'
    }),
    docLink: {
      text: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.copyToDocLinkText', {
        defaultMessage: 'Copy to documentation'
      }),
      href: _documentation.documentationService.getCopyToLink()
    },
    defaultToggleValue: defaultToggleValue
  }, _react.default.createElement(_shared_imports.UseField, {
    path: "copy_to",
    config: (0, _lib.getFieldConfig)('copy_to'),
    component: _shared_imports.Field
  }));
};

exports.CopyToParameter = CopyToParameter;