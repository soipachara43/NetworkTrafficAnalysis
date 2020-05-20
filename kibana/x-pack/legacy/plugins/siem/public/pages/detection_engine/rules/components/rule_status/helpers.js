"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatusColor = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getStatusColor = function getStatusColor(status) {
  return status == null ? 'subdued' : status === 'succeeded' ? 'success' : status === 'failed' ? 'danger' : status === 'executing' || status === 'going to run' ? 'warning' : 'subdued';
};

exports.getStatusColor = getStatusColor;