"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noProviderFound = exports.unRegisterProvider = exports.registerProvider = void 0;

var _typescriptFsa = _interopRequireDefault(require("typescript-fsa"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var actionCreator = (0, _typescriptFsa.default)('x-pack/siem/local/drag_and_drop');
var registerProvider = actionCreator('REGISTER_PROVIDER');
exports.registerProvider = registerProvider;
var unRegisterProvider = actionCreator('UNREGISTER_PROVIDER');
exports.unRegisterProvider = unRegisterProvider;
var noProviderFound = actionCreator('NO_PROVIDER_FOUND');
exports.noProviderFound = noProviderFound;