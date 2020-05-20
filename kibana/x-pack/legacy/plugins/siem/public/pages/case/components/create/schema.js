"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = exports.schemaTags = void 0;

var _shared_imports = require("../../../../shared_imports");

var i18n = _interopRequireWildcard(require("../../translations"));

var _optional_field_label = require("./optional_field_label");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var emptyField = _shared_imports.fieldValidators.emptyField;
var schemaTags = {
  type: _shared_imports.FIELD_TYPES.COMBO_BOX,
  label: i18n.TAGS,
  helpText: i18n.TAGS_HELP,
  labelAppend: _optional_field_label.OptionalFieldLabel
};
exports.schemaTags = schemaTags;
var schema = {
  title: {
    type: _shared_imports.FIELD_TYPES.TEXT,
    label: i18n.NAME,
    validations: [{
      validator: emptyField(i18n.TITLE_REQUIRED)
    }]
  },
  description: {
    label: i18n.DESCRIPTION,
    validations: [{
      validator: emptyField(i18n.DESCRIPTION_REQUIRED)
    }]
  },
  tags: schemaTags
};
exports.schema = schema;