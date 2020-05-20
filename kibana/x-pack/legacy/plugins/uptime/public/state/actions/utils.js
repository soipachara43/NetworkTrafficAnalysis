"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAsyncAction = createAsyncAction;

var _reduxActions = require("redux-actions");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function createAsyncAction(actionStr) {
  return {
    get: (0, _reduxActions.createAction)(actionStr),
    success: (0, _reduxActions.createAction)("".concat(actionStr, "_SUCCESS")),
    fail: (0, _reduxActions.createAction)("".concat(actionStr, "_FAIL"))
  };
}