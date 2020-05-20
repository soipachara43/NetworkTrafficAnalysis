"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initServerWithKibana = void 0;

var _kibana = require("./lib/compose/kibana");

var _management_server = require("./management_server");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const initServerWithKibana = hapiServer => {
  const libs = (0, _kibana.compose)(hapiServer);
  (0, _management_server.initManagementServer)(libs);
};

exports.initServerWithKibana = initServerWithKibana;