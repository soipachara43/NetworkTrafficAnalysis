"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTraceUrl = void 0;

var _url = _interopRequireDefault(require("url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getTraceUrl = function getTraceUrl(_ref) {
  var traceId = _ref.traceId,
      rangeFrom = _ref.rangeFrom,
      rangeTo = _ref.rangeTo;
  return _url.default.format({
    pathname: "/link-to/trace/".concat(traceId),
    query: {
      rangeFrom: rangeFrom,
      rangeTo: rangeTo
    }
  });
};

exports.getTraceUrl = getTraceUrl;