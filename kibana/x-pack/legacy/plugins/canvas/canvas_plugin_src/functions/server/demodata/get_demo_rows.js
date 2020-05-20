"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDemoRows = getDemoRows;

var _lodash = require("lodash");

var _ci = _interopRequireDefault(require("./ci.json"));

var _demo_rows_types = require("./demo_rows_types");

var _shirts = _interopRequireDefault(require("./shirts.json"));

var _i18n = require("../../../../i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getDemoRows(arg) {
  if (arg === _demo_rows_types.DemoRows.CI) {
    return (0, _lodash.cloneDeep)(_ci.default);
  }

  if (arg === _demo_rows_types.DemoRows.SHIRTS) {
    return (0, _lodash.cloneDeep)(_shirts.default);
  }

  throw (0, _i18n.getFunctionErrors)().demodata.invalidDataSet(arg);
}