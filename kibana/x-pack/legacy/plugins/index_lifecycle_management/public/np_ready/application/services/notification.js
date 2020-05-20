"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.fatalErrors = exports.toasts = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var toasts;
exports.toasts = toasts;
var fatalErrors;
exports.fatalErrors = fatalErrors;

function init(_toasts, _fatalErrors) {
  exports.toasts = toasts = _toasts;
  exports.fatalErrors = fatalErrors = _fatalErrors;
}