"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDestinationOrSource = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var sourceOrDestination = ['source.ip', 'destination.ip'];

var isDestinationOrSource = function isDestinationOrSource(value) {
  return value != null && sourceOrDestination.includes(value);
};

exports.isDestinationOrSource = isDestinationOrSource;