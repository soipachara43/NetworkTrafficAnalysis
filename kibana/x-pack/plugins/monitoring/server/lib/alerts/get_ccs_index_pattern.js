"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCcsIndexPattern = getCcsIndexPattern;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getCcsIndexPattern(indexPattern, remotes) {
  return `${indexPattern},${indexPattern.split(',').map(pattern => {
    return remotes.map(remoteName => `${remoteName}:${pattern}`).join(',');
  }).join(',')}`;
}