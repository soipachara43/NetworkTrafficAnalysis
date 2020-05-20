"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSnapshotCountActionFail = exports.getSnapshotCountActionSuccess = exports.getSnapshotCountAction = void 0;

var _reduxActions = require("redux-actions");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getSnapshotCountAction = (0, _reduxActions.createAction)('GET_SNAPSHOT_COUNT');
exports.getSnapshotCountAction = getSnapshotCountAction;
var getSnapshotCountActionSuccess = (0, _reduxActions.createAction)('GET_SNAPSHOT_COUNT_SUCCESS');
exports.getSnapshotCountActionSuccess = getSnapshotCountActionSuccess;
var getSnapshotCountActionFail = (0, _reduxActions.createAction)('GET_SNAPSHOT_COUNT_FAIL');
exports.getSnapshotCountActionFail = getSnapshotCountActionFail;