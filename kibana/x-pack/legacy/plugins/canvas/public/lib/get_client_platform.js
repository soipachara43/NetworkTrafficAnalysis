"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClientPlatform = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getClientPlatform = function getClientPlatform() {
  var platform = navigator.platform.toLowerCase();

  if (platform.indexOf('mac') >= 0) {
    return 'osx';
  }

  if (platform.indexOf('win') >= 0) {
    return 'windows';
  }

  if (platform.indexOf('linux') >= 0) {
    return 'linux';
  }

  return 'other';
};

exports.getClientPlatform = getClientPlatform;