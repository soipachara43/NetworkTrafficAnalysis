"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWindow = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// return window if it exists, otherwise just return an object literal
var windowObj = {
  location: null,
  localStorage: {}
};

var getWindow = function getWindow() {
  return typeof window === 'undefined' ? windowObj : window;
};

exports.getWindow = getWindow;