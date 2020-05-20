"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateHostsSort = exports.updateTableLimit = exports.setHostDetailsTablesActivePageToZero = exports.setHostTablesActivePageToZero = exports.updateTableActivePage = void 0;

var _typescriptFsa = _interopRequireDefault(require("typescript-fsa"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var actionCreator = (0, _typescriptFsa.default)('x-pack/siem/local/hosts');
var updateTableActivePage = actionCreator('UPDATE_HOST_TABLE_ACTIVE_PAGE');
exports.updateTableActivePage = updateTableActivePage;
var setHostTablesActivePageToZero = actionCreator('SET_HOST_TABLES_ACTIVE_PAGE_TO_ZERO');
exports.setHostTablesActivePageToZero = setHostTablesActivePageToZero;
var setHostDetailsTablesActivePageToZero = actionCreator('SET_HOST_DETAILS_TABLES_ACTIVE_PAGE_TO_ZERO');
exports.setHostDetailsTablesActivePageToZero = setHostDetailsTablesActivePageToZero;
var updateTableLimit = actionCreator('UPDATE_HOST_TABLE_LIMIT');
exports.updateTableLimit = updateTableLimit;
var updateHostsSort = actionCreator('UPDATE_HOSTS_SORT');
exports.updateHostsSort = updateHostsSort;