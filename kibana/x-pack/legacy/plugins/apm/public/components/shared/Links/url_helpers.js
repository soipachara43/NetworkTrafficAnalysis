"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toQuery = toQuery;
exports.fromQuery = fromQuery;

var _queryString = require("query-string");

var _public = require("../../../../../../../../src/plugins/kibana_utils/public");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function toQuery(search) {
  return search ? (0, _queryString.parse)(search.slice(1), {
    sort: false
  }) : {};
}

function fromQuery(query) {
  var encodedQuery = _public.url.encodeQuery(query, function (value) {
    return encodeURIComponent(value).replace(/%3A/g, ':');
  });

  return (0, _queryString.stringify)(encodedQuery, {
    sort: false,
    encode: false
  });
}