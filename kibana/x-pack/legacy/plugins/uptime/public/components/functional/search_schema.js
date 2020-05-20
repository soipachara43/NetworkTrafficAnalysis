"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterBarSearchSchema = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var filterBarSearchSchema = {
  strict: true,
  fields: {
    'monitor.id': {
      type: 'string'
    },
    'monitor.status': {
      type: 'string'
    },
    'monitor.ip': {
      type: 'string'
    },
    'monitor.host': {
      type: 'string'
    },
    'monitor.scheme': {
      type: 'string'
    },
    'url.port': {
      type: 'number'
    }
  }
};
exports.filterBarSearchSchema = filterBarSearchSchema;