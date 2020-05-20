"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexStatusAction = void 0;

var _utils = require("./utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var indexStatusAction = (0, _utils.createAsyncAction)('GET INDEX STATUS');
exports.indexStatusAction = indexStatusAction;