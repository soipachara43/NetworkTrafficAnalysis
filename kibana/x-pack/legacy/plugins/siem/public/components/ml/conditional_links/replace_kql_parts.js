"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceKQLParts = void 0;

var _fp = require("lodash/fp");

var _replace_kql_commas_with_or = require("./replace_kql_commas_with_or");

var _remove_kql_variables = require("./remove_kql_variables");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var replaceKQLParts = function replaceKQLParts(kqlQuery) {
  return (0, _fp.flow)(_replace_kql_commas_with_or.replaceKqlCommasWithOr, _remove_kql_variables.removeKqlVariables)(kqlQuery);
};

exports.replaceKQLParts = replaceKQLParts;