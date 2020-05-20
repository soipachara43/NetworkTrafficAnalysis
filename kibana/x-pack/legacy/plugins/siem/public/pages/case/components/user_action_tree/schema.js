"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = void 0;

var _shared_imports = require("../../../../shared_imports");

var i18n = _interopRequireWildcard(require("../../translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var emptyField = _shared_imports.fieldValidators.emptyField;
var schema = {
  content: {
    type: _shared_imports.FIELD_TYPES.TEXTAREA,
    validations: [{
      validator: emptyField(i18n.REQUIRED_FIELD)
    }]
  }
};
exports.schema = schema;