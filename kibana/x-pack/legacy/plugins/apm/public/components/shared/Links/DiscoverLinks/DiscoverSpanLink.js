"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscoverSpanLink = void 0;

var _react = _interopRequireDefault(require("react"));

var _elasticsearch_fieldnames = require("../../../../../../../../plugins/apm/common/elasticsearch_fieldnames");

var _DiscoverLink = require("./DiscoverLink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getDiscoverQuery(span) {
  var query = "".concat(_elasticsearch_fieldnames.SPAN_ID, ":\"").concat(span.span.id, "\"");
  return {
    _a: {
      interval: 'auto',
      query: {
        language: 'kuery',
        query: query
      }
    }
  };
}

var DiscoverSpanLink = function DiscoverSpanLink(_ref) {
  var span = _ref.span,
      children = _ref.children;
  return _react.default.createElement(_DiscoverLink.DiscoverLink, {
    query: getDiscoverQuery(span),
    children: children
  });
};

exports.DiscoverSpanLink = DiscoverSpanLink;