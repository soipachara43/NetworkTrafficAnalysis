"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getApmHref = void 0;

var _lodash = require("lodash");

var _add_base_path = require("./add_base_path");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getApmHref = function getApmHref(summary, basePath, dateRangeStart, dateRangeEnd) {
  return (0, _add_base_path.addBasePath)(basePath, "/app/apm#/services?kuery=".concat(encodeURI("url.domain: \"".concat((0, _lodash.get)(summary, 'state.url.domain'), "\"")), "&rangeFrom=").concat(dateRangeStart, "&rangeTo=").concat(dateRangeEnd));
};

exports.getApmHref = getApmHref;