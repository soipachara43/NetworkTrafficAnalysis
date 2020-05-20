"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArgs = getArgs;
exports.getArg = getArg;
exports.getValue = getValue;
exports.getState = getState;
exports.getError = getError;
exports.getInFlight = getInFlight;

var _lodash = require("lodash");

var argHelper = _interopRequireWildcard(require("../../lib/resolved_arg"));

var _modify_path = require("../../lib/modify_path");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore Untyped Local
// @ts-ignore Untyped Local
function getArgs(state) {
  return (0, _lodash.get)(state, ['transient', 'resolvedArgs']);
}

function getArg(state, path) {
  return (0, _lodash.get)(state, (0, _modify_path.prepend)(path, ['transient', 'resolvedArgs']));
}

function getValue(state, path) {
  return argHelper.getValue(getArg(state, path));
}

function getState(state, path) {
  return argHelper.getState(getArg(state, path));
}

function getError(state, path) {
  return argHelper.getError(getArg(state, path));
}

function getInFlight(state) {
  return (0, _lodash.get)(state, ['transient', 'inFlight'], false);
}