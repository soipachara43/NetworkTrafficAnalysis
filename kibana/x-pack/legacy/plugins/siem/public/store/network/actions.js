"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setNetworkTablesActivePageToZero = exports.setIpDetailsTablesActivePageToZero = exports.updateNetworkTable = void 0;

var _typescriptFsa = _interopRequireDefault(require("typescript-fsa"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var actionCreator = (0, _typescriptFsa.default)('x-pack/siem/local/network');
var updateNetworkTable = actionCreator('UPDATE_NETWORK_TABLE');
exports.updateNetworkTable = updateNetworkTable;
var setIpDetailsTablesActivePageToZero = actionCreator('SET_IP_DETAILS_TABLES_ACTIVE_PAGE_TO_ZERO');
exports.setIpDetailsTablesActivePageToZero = setIpDetailsTablesActivePageToZero;
var setNetworkTablesActivePageToZero = actionCreator('SET_NETWORK_TABLES_ACTIVE_PAGE_TO_ZERO');
exports.setNetworkTablesActivePageToZero = setNetworkTablesActivePageToZero;