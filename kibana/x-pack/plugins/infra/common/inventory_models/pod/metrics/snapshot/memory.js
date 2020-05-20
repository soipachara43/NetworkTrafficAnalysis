"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.memory = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const memory = {
  memory: {
    avg: {
      field: 'kubernetes.pod.memory.usage.node.pct'
    }
  }
};
exports.memory = memory;