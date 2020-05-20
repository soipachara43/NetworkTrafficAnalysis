"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capabilities = void 0;

var _legacy_imports = require("../legacy_imports");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var capabilities = {
  get: function get() {
    return _legacy_imports.npStart.core.application.capabilities;
  }
};
exports.capabilities = capabilities;