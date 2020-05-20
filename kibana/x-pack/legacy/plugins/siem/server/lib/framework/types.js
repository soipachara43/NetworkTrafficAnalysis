"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  internalFrameworkRequest: true
};
exports.internalFrameworkRequest = void 0;

var _typed_resolvers = require("../../utils/typed_resolvers");

Object.keys(_typed_resolvers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _typed_resolvers[key];
    }
  });
});

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const internalFrameworkRequest = Symbol('internalFrameworkRequest');
exports.internalFrameworkRequest = internalFrameworkRequest;