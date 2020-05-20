"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultFetchPolicy = exports.createFilter = void 0;

var _fp = require("lodash/fp");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var createFilter = function createFilter(filterQuery) {
  return (0, _fp.isString)(filterQuery) ? filterQuery : JSON.stringify(filterQuery);
};

exports.createFilter = createFilter;

var getDefaultFetchPolicy = function getDefaultFetchPolicy() {
  return 'cache-and-network';
};

exports.getDefaultFetchPolicy = getDefaultFetchPolicy;