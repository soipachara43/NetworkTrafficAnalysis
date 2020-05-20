"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useChartsSync = useChartsSync;

var _react = require("react");

var _ChartsSyncContext = require("../context/ChartsSyncContext");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function useChartsSync() {
  var context = (0, _react.useContext)(_ChartsSyncContext.ChartsSyncContext);

  if (!context) {
    throw new Error('Missing ChartsSync context provider');
  }

  return context;
}