"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addBasePath = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var addBasePath = function addBasePath(basePath, url) {
  return "".concat(basePath.length > 0 ? "".concat(basePath) : '').concat(url);
};

exports.addBasePath = addBasePath;