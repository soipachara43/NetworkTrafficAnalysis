"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvancedSettings = void 0;

var _chrome = _interopRequireDefault(require("ui/chrome"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var AdvancedSettings = _chrome.default.getUiSettingsClient();

exports.AdvancedSettings = AdvancedSettings;