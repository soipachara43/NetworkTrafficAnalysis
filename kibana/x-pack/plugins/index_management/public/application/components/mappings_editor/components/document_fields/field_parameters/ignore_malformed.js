"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IgnoreMalformedParameter = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _documentation = require("../../../../../services/documentation");

var _edit_field = require("../fields/edit_field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var IgnoreMalformedParameter = function IgnoreMalformedParameter(_ref) {
  var description = _ref.description;
  return _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.ignoreMalformedFieldTitle', {
      defaultMessage: 'Ignore malformed data'
    }),
    description: description ? description : _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.ignoredMalformedFieldDescription', {
      defaultMessage: 'By default, documents that contain the wrong data type for a field are not indexed. If enabled, these documents are indexed, but fields with the wrong data type are filtered out. Be careful: if too many documents are indexed this way, queries on the field become meaningless.'
    }),
    docLink: {
      text: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.ignoreMalformedDocLinkText', {
        defaultMessage: 'Ignore malformed documentation'
      }),
      href: _documentation.documentationService.getIgnoreMalformedLink()
    },
    formFieldPath: "ignore_malformed"
  });
};

exports.IgnoreMalformedParameter = IgnoreMalformedParameter;