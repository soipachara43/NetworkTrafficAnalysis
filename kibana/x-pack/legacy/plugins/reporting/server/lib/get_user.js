"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserFactory = getUserFactory;

var _server = require("../../../../../../src/core/server");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getUserFactory(server, security) {
  /*
   * Legacy.Request because this is called from routing middleware
   */
  return async request => {
    var _ref;

    return (_ref = security === null || security === void 0 ? void 0 : security.authc.getCurrentUser(_server.KibanaRequest.from(request))) !== null && _ref !== void 0 ? _ref : null;
  };
}