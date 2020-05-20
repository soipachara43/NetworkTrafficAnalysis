"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hostDetailsPagePath = exports.hostsPagePath = void 0;

var _types = require("../home/types");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var hostsPagePath = "/:pageName(".concat(_types.SiemPageName.hosts, ")");
exports.hostsPagePath = hostsPagePath;
var hostDetailsPagePath = "".concat(hostsPagePath, "/:detailName");
exports.hostDetailsPagePath = hostDetailsPagePath;