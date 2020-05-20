"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFilter = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var createFilter = function createFilter(key, value) {
  var queryValue = value != null ? Array.isArray(value) ? value[0] : value : null;
  return queryValue != null ? {
    meta: {
      alias: null,
      negate: false,
      disabled: false,
      type: 'phrase',
      key: key,
      value: queryValue,
      params: {
        query: queryValue
      }
    },
    query: {
      match: _defineProperty({}, key, {
        query: queryValue,
        type: 'phrase'
      })
    }
  } : {
    exists: {
      field: key
    },
    meta: {
      alias: null,
      disabled: false,
      key: key,
      negate: value === undefined,
      type: 'exists',
      value: 'exists'
    }
  };
};

exports.createFilter = createFilter;