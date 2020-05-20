"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasicTable = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var BasicTable = (0, _styledComponents.default)(_eui.EuiInMemoryTable // eslint-disable-line @typescript-eslint/no-explicit-any
).withConfig({
  displayName: "BasicTable",
  componentId: "k4bnf-0"
})(["tbody{th,td{vertical-align:top;}.euiTableCellContent{display:block;}}"]); // eslint-disable-line @typescript-eslint/no-explicit-any

exports.BasicTable = BasicTable;
BasicTable.displayName = 'BasicTable';