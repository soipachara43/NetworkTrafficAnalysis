"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseTimestamp = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var parseTimestamp = function parseTimestamp(tsValue) {
  var parsed = Date.parse(tsValue);

  if (isNaN(parsed)) {
    parsed = parseInt(tsValue, 10);
  }

  return (0, _moment.default)(parsed);
};

exports.parseTimestamp = parseTimestamp;