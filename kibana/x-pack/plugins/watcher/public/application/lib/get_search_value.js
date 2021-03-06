"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSearchValue = getSearchValue;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * @param object to be used to generate the search value
 * @param array of property keys to use to generate the search value
 * @return newline delimited string built from the specified properties
 */
function getSearchValue(obj, fields) {
  return (0, _lodash.values)((0, _lodash.pick)(obj, fields)).join('\n');
}