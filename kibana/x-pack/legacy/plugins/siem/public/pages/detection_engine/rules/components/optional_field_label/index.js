"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionalFieldLabel = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var RuleI18n = _interopRequireWildcard(require("../../translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var OptionalFieldLabel = _react.default.createElement(_eui.EuiText, {
  color: "subdued",
  size: "xs"
}, RuleI18n.OPTIONAL_FIELD);

exports.OptionalFieldLabel = OptionalFieldLabel;