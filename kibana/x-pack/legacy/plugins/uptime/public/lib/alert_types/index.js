"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alertTypeInitializers = void 0;

var _monitor_status = require("./monitor_status");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// TODO: after NP migration is complete we should be able to remove this lint ignore comment
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
var alertTypeInitializers = [_monitor_status.initMonitorStatusAlertType];
exports.alertTypeInitializers = alertTypeInitializers;