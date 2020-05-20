"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeError = exports.addError = exports.addNotes = exports.updateNote = void 0;

var _typescriptFsa = _interopRequireDefault(require("typescript-fsa"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var actionCreator = (0, _typescriptFsa.default)('x-pack/siem/local/app');
var updateNote = actionCreator('UPDATE_NOTE');
exports.updateNote = updateNote;
var addNotes = actionCreator('ADD_NOTE');
exports.addNotes = addNotes;
var addError = actionCreator('ADD_ERRORS');
exports.addError = addError;
var removeError = actionCreator('REMOVE_ERRORS');
exports.removeError = removeError;